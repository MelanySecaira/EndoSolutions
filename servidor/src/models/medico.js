import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { Especialidad } from "./especialidad.js";
import { Persona } from "./persona.js";

export const Medico = sequelize.define('tb_medico',{
    id_med_medico:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_med_especialidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    // timestamps: false,
    freezeTableName: true
});

Medico.belongsTo(Especialidad,{foreignKey: 'id_med_especialidad',targetKey: 'id_esp_especialidad'}); 

Persona.hasOne(Medico,{foreignKey: 'id_med_medico',targetKey: 'id_per_persona'});
