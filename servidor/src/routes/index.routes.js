import { Router } from "express";

import personaRouter from "./persona.routes.js";
import especialidadRouter from "./especialidad.routes.js";
import medicoRouter from "./medico.routes.js";
import pacienteRouter from "./paciente.routes.js";
import infoMedicaRouter from "./info_medica.routes.js";
import procesoRouter from "./proceso.routes.js";


const router = Router();

router.get("/info", (req, res, next) => {
    res.json({
      status: 200,
      message: "OK",
      version: "1.2",
    });
  });

router.use("/persona", personaRouter);
router.use("/especialidad", especialidadRouter);
router.use("/medico", medicoRouter);
router.use("/paciente", pacienteRouter);
router.use("/info_medica", infoMedicaRouter);
router.use("/proceso", procesoRouter);

export default router;