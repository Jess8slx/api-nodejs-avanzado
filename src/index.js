import 'dotenv/config';
import express from 'express';
import { pool, connectDB } from './config/db.js';
import { redis, connectRedis } from './config/redis.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', async (req, res) => {
    await pool.query('SELECT 1');
    await redis.ping();
    res.json({ status: 'ok', postgres: 'up', redis: 'up', timestamp: new Date().toISOString() });
});

async function start() {
    try {
        await connectDB();
        await connectRedis();
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
        process.exit(1);
    }
}

start();