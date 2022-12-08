const mysql = require('mysql2/promise');
const mysqlPool = require('mysql2/promise');
const defaultConfig = {}

let connection
let pool
module.exports.connectToServer = async (config) => {
    try {
        const conn = await mysql.createConnection({
            host: config.IP,
            user: config.username,
            password: config.password,
            database: config.database,
            ...defaultConfig
        })
        connection = conn

        return { status: true, message: `Connected MySQL: ${config.database}` }
    } catch (error) {
        return { status: false, message: 'Failed to connect MySQL', error }
    }
}

module.exports.connectToPool = async (config) => {
    try {
        const _pool = await mysqlPool.createPool({
            host: config.IP,
            user: config.username,
            password: config.password,
            database: config.database,
            ...defaultConfig
        })
        pool = _pool

        return { status: true, message: `Connected to MySQL Pool: ${config.database}` }
    } catch (error) {
        return { status: false, message: 'Failed to connect MySQL pool', error }
    }
}

module.exports.getDb = () => {
    return connection
}

module.exports.getPool = () => {
    return pool
}

module.exports.closeConnections = () => {
    if (connection) {
        connection.end()
    }
    if (pool) {
        pool.end()
    }
    return true
}