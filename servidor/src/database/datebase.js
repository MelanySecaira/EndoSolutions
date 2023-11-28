import Sequelize from 'sequelize';

export const sequelize = new Sequelize("db_selecpan", "postgres", "secaira", {
    host: "localhost",
    dialect: "postgres",
})