const connection = require('./mysql')

module.exports.runQuery = async (query, params = []) => {
    try {
        const conn = connection.getDb()
        const [rows, fields] = await conn.execute(query, params)
        return { rows }
    } catch (error) {
        throw error
    }
}
module.exports.runPoolQuery = async (query, params = []) => {
    try {
        const pool = connection.getPool()
        const [rows, fields] = await pool.execute(query, params)
        return { rows }
    } catch (error) {
        throw error
    }
}