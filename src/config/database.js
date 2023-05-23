import mysql from "mysql2/promise";

const { DB_HOST, DB_NAME, DB_USER, DB_PWD } = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PWD,
});

pool.getConnection().then((res) => console.log(res.config.database));

export { pool };