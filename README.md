
# Commons - MySQL

## Contents

1. [Connection](#connection)
2. [CRUD Operations](#crud-operations)

## Connection

To connect to the mysql database call connectToServer method and pass in database object.

This will return 2 parameters status and message. If status is true that means you are connected.

```js
const { connections: mysql } = require('commons-mysql-crud')

const res = await mysql.connectToServer({
    host: "127.0.0.1",
    user: "root",
    password: "pass@456",
    database: "my_db"
})

console.log(res)
// { status: true, message: 'Connected MySQL: my_db' }
```

__Re-use same connection elsewhere__

Once connected you get status flag. Now you can utilize the same connection anywhere in your node.js application.

To do so use getDb() function to get the connection.

```js
const { connections: mysql } = require('commons-mysql-crud')

const mysqlConn = mysql.getDb()
// further use mysqlConn to run any query
```

__Close database connection on app shutdown__

This is important part of the connection. Use closeConnections() method if there is no requirement of using mysql connection or during graceful shutdown

```js
const { connections: mysql } = require('commons-mysql-crud')

mysql.closeConnections()
```

## Crud Operations

__Running Simple query__

To run a query against the given database use runQuery() method of mysqlCrud

```js
const { crud } = require('commons-mysql-crud')

const query = "SELECT id, database from DB_LIST"
const parameters = []

const response = await crud.runQuery(query, parameters)
console.log(response)

// { rows: [{ id: 1, firstName: 'mysql' }, { id: 2, firstName: 'mongo' }] }
```

__Running query with parameters__

To run a query with parameters pass in the array of required parameters

```js
const { crud } = require('commons-mysql-crud')

const query = "SELECT id, database from DB_LIST WHERE id = ?"
const parameters = [2]

const response = await crud.runQuery(query, parameters)
console.log(response)

// { rows: [{ id: 2, firstName: 'mongo' }] }
```

__Transactions on MySQL (Not yet)__

Transactions is used in mysql to perform a certain set of operations(insert/update/delete) etc with a rollback facility.
THis is to ensure that whatever operations we performed on said database must either happen or fail.
In short All or Nothing.

For this create a group of array and each object in array must have query and params.
Eg: [{query: "INSERT ... ?", params: [2]}]
```js
const conn = require('commons-mysql-crud')

const operations = [
    {
        {
            query: "INSERT INTO my_db.table_name VALUES(?,?,?,?)",
            params: [6, 'f1', 'f2', 'f3']
        }
    },
    ...
    ...
]
const transaction = await conn.runTransactions(operations)
console.log(transaction)
// {status: true, results: []}
// results will contain response for each of the given query

```