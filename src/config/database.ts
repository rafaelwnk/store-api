import mongoose from 'mongoose';
import { env } from './env';

export async function connectDatabase(): Promise<void> {
    try {
        const uri = env.databaseUrl;

        if (!uri) {
            throw new Error('DATABASE_URL não definida')
        }

        await mongoose.connect(uri);
    } catch (error) {
        console.error('Erro ao conectar no MongoDB:', error);
        process.exit(1);
    }
}