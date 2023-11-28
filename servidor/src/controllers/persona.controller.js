import { Persona } from "../models/persona.js";
import { paginarDatos } from "../utils/paginacion.utils.js";


export const getPersonas = async (req, res) => {
    try {
        const paginationDatos = req.query;
        if (paginationDatos.page == "undefined") {
            const { datos, total } = await paginarDatos(1, 10, Persona, '', '');
            res.json({
                status: true,
                message: "Datos obtenidos correctamente",
                body: datos,
                total,
            });
        }
        const personas = await Persona.findAll({ limit: 5 });
        if (personas.length == 0 || !personas) {
            return res.json({
                status: false,
                message: "No se encontraron datos",
                body: [],
            });
        } else {
            const { datos, total } = await paginarDatos(paginationDatos.page, paginationDatos.size, Persona, paginationDatos.parameter, paginationDatos.data);
            res.json({
                status: true,
                message: "Datos obtenidos correctamente",
                body: datos,
                total,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the user'
        });
    }
    // res.send('Hola Mundo');
}

export const getPersonaById = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (persona) {
            return res.json({
                status: true,
                message: "Persona encontrada",
                body: persona,
            });
        } else {
            return res.json({
                status: false,
                message: "Persona no encontrada",
                body: [],
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the user'
        });
    }
}


export const createPersona = async (req, res) => {
    try {
        const { nombre, apellido, cedula, email, contrasenia, telefono, direccion, tipo } = req.body;

        // Verificar si ya existe una persona con el mismo correo
        const personaExistenteCorreo = await Persona.findOne({
            where: {
                str_per_correo: email,
            },
        });

        // Verificar si ya existe una persona con la misma cédula
        const personaExistenteCedula = await Persona.findOne({
            where: {
                str_per_cedula: cedula,
            },
        });

        if (personaExistenteCorreo && personaExistenteCedula) {
            // Si ya existe una persona con el mismo correo y cédula, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Ya existe una persona con este correo y cédula",
                body: [],
            });
        }

        if (personaExistenteCorreo) {
            // Si ya existe una persona con el mismo correo, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Ya existe una persona con este correo electrónico",
                body: [],
            });
        }

        if (personaExistenteCedula) {
            // Si ya existe una persona con la misma cédula, responder con un mensaje de error
            return res.status(400).json({
                status: false,
                message: "Ya existe una persona con esta cédula",
                body: [],
            });
        }

        // Si no hay conflictos, crear la persona utilizando el modelo Persona
        const persona = await Persona.create({
            str_per_nombre: nombre,
            str_per_apellido: apellido,
            str_per_cedula: cedula,
            str_per_correo: email,
            str_per_contrasenia: contrasenia,
            str_per_telefono: telefono,
            str_per_direccion: direccion,
            str_per_estado: 'Activo', // Predeterminado
            str_per_tipo: tipo,
        });

        if (persona) {
            // Enviar una respuesta de éxito con la persona creada
            return res.json({
                status: true,
                message: "Persona creada exitosamente",
                body: persona,
            });
        } else {
            return res.json({
                status: false,
                message: "Persona no creada",
                body: [],
            });
        }
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la creación
        console.log(error);
        res.status(500).json({
            error: 'Error al crear la persona',
        });
    }
}

// export const createPersona = async (req, res) => {
//     console.log("entra a createPersona ============================================== ", req.body);
//     try {
//         const { nombre, apellido, cedula, email, contrasenia, telefono, direccion, tipo } = req.body;

//         console.log("entra a validar persona---------------------- ---- ", req.body);
//         // Validar la persona antes de crearla
//         const validacion = await validarPersona(req, res);

//         // console.log("validacion MENSAJE en createPersona ---- ", validacion);

//         if (!validacion.status) {
//             // Si la validación falla, no continuar con la creación de la persona
//             return;
//         } else {
//             // Si no hay conflictos, crear la persona utilizando el modelo Persona
//             const persona = await Persona.create({
//                 str_per_nombre: nombre,
//                 str_per_apellido: apellido,
//                 str_per_cedula: cedula,
//                 str_per_correo: email,
//                 str_per_contrasenia: contrasenia,
//                 str_per_telefono: telefono,
//                 str_per_direccion: direccion,
//                 str_per_estado: 'Activo', // Predeterminado
//                 str_per_tipo: tipo,
//             });

//             if (persona) {
//                 // Enviar una respuesta de éxito con la persona creada
//                 return res.json({
//                     status: true,
//                     message: "Persona creada exitosamente",
//                     body: persona,
//                 });
//             } else {
//                 return res.json({
//                     status: false,
//                     message: "Persona no creada",
//                     body: [],
//                 });
//             }
//         }


//     } catch (error) {
//         // Manejar cualquier error que pueda ocurrir durante la creación
//         console.log(error);
//         // res.status(500).json({
//         //     error: 'Error al crear la persona',
//         // });
//     }
// };

const validarPersona = async (req, res) => {
    try {
        const { cedula, email } = req.body;
        const personaExistenteCorreo = await Persona.findOne({
            where: {
                str_per_correo: email,
            },
        });

        // Verificar si ya existe una persona con la misma cédula
        const personaExistenteCedula = await Persona.findOne({
            where: {
                str_per_cedula: cedula,
            },
        });

        if (personaExistenteCorreo && personaExistenteCedula) {
            // Si ya existe una persona con el mismo correo y cédula, responder con un mensaje de error
            return res.json({
                status: false,
                message: "Ya existe una persona con este correo y cédula",
                body: [],
            });
        }

        if (personaExistenteCorreo) {
            // Si ya existe una persona con el mismo correo, responder con un mensaje de error
            return res.json({
                status: false,
                message: "Ya existe una persona con este correo electrónico",
                body: [],
            });
        }

        if (personaExistenteCedula) {
            // Si ya existe una persona con la misma cédula, responder con un mensaje de error
            return res.json({
                status: false,
                message: "Ya existe una persona con esta cédula",
                body: [],
            });
        }

    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la validación
        // console.log(error);
        res.status(500).json({
            error: error.message || 'Error al validar la persona',
        });
        // Si hay un error, devuelve un objeto con status false
        return { status: false };
    }
};


export const updatePersona = async (req, res) => {
    const { nombre, apellido, cedula, email, contrasenia, telefono, direccion, estado, tipo } = req.body;

    try {
        // const { id } = req.params;
        const persona = await Persona.findByPk(req.params.id)

        if (persona) {
            await persona.update({
                str_per_nombre: nombre,
                str_per_apellido: apellido,
                str_per_cedula: cedula,
                str_per_correo: email,
                str_per_contrasenia: contrasenia,
                str_per_telefono: telefono,
                str_per_direccion: direccion,
                str_per_estado: estado,
                str_per_tipo: tipo,
            });
            await persona.save();
            const updatedPersona = await Persona.findByPk(req.params.id);
            return res.json({
                status: true,
                message: "Persona actualizada exitosamente",
                body: updatedPersona,
            });
        } else {
            return res.json({
                status: false,
                message: "Persona no encontrada",
                body: [],
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const deletePersona = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (persona) {
            if (persona.str_per_estado == 'Activo') {
                await persona.update({
                    str_per_estado: 'Inactivo',
                });
                await persona.save();
                return res.json({
                    status: true,
                    message: "Persona desactivada exitosamente",
                    body: persona,
                });
            } else {
                await persona.update({
                    str_per_estado: 'Activo',
                });

                await persona.save();
                return res.json({
                    status: true,
                    message: "Persona activada exitosamente",
                    body: persona,
                });
            }
        }else{
            return res.json({
                status: false,
                message: "Persona no encontrada",
                body: [],
            });
        }
    } catch (error) {
        console.log(error);
    }
}
