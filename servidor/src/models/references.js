import { Persona } from './persona.js';
import { Especialidad } from './especialidad.js';
import { Medico } from './medico.js';

Medico.belongsTo(Especialidad,{foreignKey: 'id_med_especialidad',targetKey: 'id_esp_especialidad'}); 
Especialidad.hasMany(Medico,{foreignKey: 'id_med_especialidad',sourceKey: 'id_esp_especialidad'});
// Establece la asociación entre Persona y Medico
// Persona.hasOne(Medico, { foreignKey: 'id_per_persona' });
// Medico.belongsTo(Persona, { foreignKey: 'id_per_persona', constraints: false, primaryKey: true });
// Medico.belongsTo(Persona, { foreignKey: 'id_per_persona', targetKey: 'id_per_persona' });

Medico.belongsTo(Persona, { foreignKey: 'id_med_medico', targetKey: 'id_per_persona' });

