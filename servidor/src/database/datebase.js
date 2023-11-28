import Sequelize from 'sequelize';

export const sequelize = new Sequelize("db_endosolutions", "postgres", "secaira", {
    host: "localhost",
    dialect: "postgres",
})