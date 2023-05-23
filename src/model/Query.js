import { pool } from "../config/database.js";

class Query {
    static async findAll(query) {
        return await pool.execute(query);
    }

    static async write(query, data) {
        return await pool.execute(query, [...Object.values(data)]);
    }
}

export default Query;
