import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function connectDB() {
    const { rows } = await pool.query('SELECT NOW() AS now');
    console.log(`Conectado a PostgreSQL (${process.env.DB_HOST}) | hora del servidor: ${rows[0].now.toISOString()}`);
}