import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        app.listen(4000);
        console.log('Server on port 4000');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

main();