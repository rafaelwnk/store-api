import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';

async function startServer() {
    await connectDatabase();

    app.listen(env.port, () => {
        console.log(`API rodando na porta ${env.port}`)
    });
}

startServer();