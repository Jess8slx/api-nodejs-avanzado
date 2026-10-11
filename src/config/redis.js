import { Redis } from 'ioredis';

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
});

export async function connectRedis() {
    const pong = await redis.ping();
    console.log(`Conectado a Redis (${process.env.REDIS_HOST}) | PING → ${pong}`);
}
