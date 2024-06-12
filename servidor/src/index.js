import app from './app.js';
import { sequelize } from './database/database.js';

/*
CREACION DE LA TABLA	

*/
import './models/persona.js';
import './models/especialidad.js';
import './models/medico.js';
import './models/paciente.js';
// import './models/references.js';

async function main(){
    try {
        // await sequelize.authenticate();
        await sequelize.sync(); //crea las tablas si no existen
        // await sequelize.sync({ force: true}); //elimina las tablas y las vuelve a crear
        // await sequelize.sync({ alter: true}); //actualiza la estructura de la tabla
        console.log('Connection has been established successfully.');
        app.listen(3000);
        console.log('Server on port ',3000,' http://localhost:3000/');
    } catch (error) {
        console.log('No se pudo establecer la conexión =>',error.message);
    }
}

main();