import { useEffect, useState } from "react";
import axios from "axios";

import { buttons } from "../../../components/buttons";
import BackofficeLayout from "../../../components/layout";

export default function listClient() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const quickSuscription = async (id) => {
    const response = await axios.put("/api/backoffice/add/suscription", { id });
    if (response.status === 201) {
      buttons
        .fire({
          icon: "success",
          title: "Éxito",
          text: "Se suscribió al cliente correctamente",
        })
    } else {
      buttons.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al suscribir al cliente",
      });
    }
  };

  const getClients = async () => {
    const response = await axios.get("/api/backoffice/list/clients");
    const { data } = response;
    setClients(
      data.map((item) => {
        if (item.fecha_suscripcion === null) {
          return item
        }
        return {
          ...item,
          fecha_suscripcion: new Date(
            item.fecha_suscripcion
          ).toLocaleDateString(),
          fecha_vencimiento: new Date(
            item.fecha_vencimiento
          ).toLocaleDateString(),
        };
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    getClients();
  });

  return (
    <BackofficeLayout>
      <div>
        <p className="font-mono font-bold text-3xl text-black">Lista de Clientes</p>
      </div>
      <div className="overflow-x-auto bg-transparent">
        <table className="table-auto mx-auto border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-black">ID</th>
              <th className="px-4 py-2 border text-black">DNI</th>
              <th className="px-4 py-2 border text-black">
                Nombres Completos
              </th>
              <th className="p-2 border text-black">Fecha de Ingreso</th>
              <th className="p-2 border text-black">Suscripción</th>
              <th className="p-2 border text-black">Celular</th>
              <th className="p-2 border text-black">Foto</th>
              <th className="p-2 border text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="border p-2">Cargando...</td>
              </tr>
            )}
            {loading === false &&
              clients.length > 0 &&
              clients.map((client) => {
                return (
                  <tr key={client.id}>
                    <td className="border p-2 text-black">{client.id}</td>
                    <td className="border p-2 text-black">{client.dni}</td>
                    <td className="border p-2 text-black">
                      {client.nombre} {client.apellido}
                    </td>
                    <td className="border p-2 text-black">{client.fecha_suscripcion !== null ? client.fecha_suscripcion : 'No tiene suscripción'}</td>
                    <td className="border p-2">
                      {client.suscrito === 1 ? (
                        <span className="inline-block px-2 py-1 text-s font-bold leading-none text-white bg-green-500 rounded-full">
                          Activa hasta {client.fecha_vencimiento}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-s font-bold leading-none text-white bg-red-500 rounded-full">
                          Inactiva
                        </span>
                      )}
                    </td>
                    <td className="border p-2 text-black">{client.telefono}</td>
                    <td className="border p-2 text-black">
                      <img
                        src={`/uploads/temp/${client.foto}`}
                        alt="Picture of the author"
                        className="w-32 h-32"
                      />
                    </td>
                    <td className="border p-2">
                      <div>
                        <svg
                          className="heroicon-s-pencil h-12 w-12 text-white-500"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="black"
                        >
                          <path
                            d="M12.2929 3.29289C12.6834 2.90237 13.3166 2.90237 13.7071 3.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711L7.41421 17H4V13.5858L12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289V5.29289Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div
                        className="text-cgreen font-bold cursor-pointer"
                        onClick={() => quickSuscription(client.id)}
                      >
                        Suscribir
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </BackofficeLayout>
  );
}
