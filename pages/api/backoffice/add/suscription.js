import { excuteQuery } from "../../../../server/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).end();
  } else {
    const { id } = req.body;
    const fecha_suscripcion = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const fecha_suscripcion_obj = new Date(fecha_suscripcion); // Convertir la fecha de suscripción en objeto Date

    fecha_suscripcion_obj.setDate(fecha_suscripcion_obj.getDate() + 30); // Sumar 30 días a la fecha de suscripción

    const fecha_vencimiento = fecha_suscripcion_obj
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    try {
      const response = await excuteQuery({
        query:
          "UPDATE `usuario` SET `suscrito` = 1, `fecha_suscripcion` = ?, `fecha_vencimiento` = ?  WHERE `id` = ?;",
        values: [fecha_suscripcion, fecha_vencimiento, id],
      });
      if (response.errno) {
        return res
          .status(400)
          .json({ error: "No se pudo registrar la suscripción" });
      }
      return res.status(201).json({
        message: "Suscripción registrada correctamente",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
}
