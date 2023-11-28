import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Persona = sequelize.define('tb_persona',{
    id_per_persona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_per_nombre:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_per_apellido:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    str_per_cedula:{
        type: DataTypes.STRING(10),
        allowNull: false,
        // unique: true
    },
    str_per_correo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        isEmail: true,
    },
    str_per_contrasenia:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    str_per_telefono:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    str_per_direccion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    str_per_estado:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    str_per_tipo:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // dt_per_fecha_registro:{
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    // dt_per_fecha_modificacion:{
    //     type: DataTypes.DATE,
    //     allowNull: false  //
    // }
    
},{
    // timestamps: false,
    freezeTableName: true
});