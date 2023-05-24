import { useState } from "react";
import axios from "axios";

import { buttons } from "../../../components/buttons";
import BackofficeLayout from "../../../components/layout";
import Modal from "../../../components/modal";

export default function Register() {
  const [dni, setDNI] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDNIChange = (e) => {
    setDNI(e.target.value);
  };

  const closeModal = () => {
    setOpen(false);
  }

  const registerAttendance = async (id) => {
    const response = await axios.post('/api/backoffice/add/attendance', {
      id
    })
    if (response.status === 201) {
      buttons.fire({
        icon: "success",
        title: "Éxito",
        text: "Se registró la asistencia correctamente",
      });
    } else {
      buttons.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar la asistencia",
      });
    }
    closeModal();
  }

  const searchClient = async () => {
    if (dni.length < 8) {
      buttons.fire({
        icon: "error",
        title: "Error",
        text: "Ingrese un documento de identidad válido",
      });
      return;
    }
    setLoading(true);
    const { data } = await axios.get(
      `/api/backoffice/search/client?dni=${dni}`
    );
    if (data) {
      setUser(data);
      setOpen(true);
    } else {
      buttons.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró ningún cliente con ese documento de identidad",
      })
    }
    setLoading(false);
  };
  return (
    <BackofficeLayout>
      <Modal isOpen={open} onClose={closeModal} user={user} registerAttendance={registerAttendance} search={true}/>
      <div>
        <label htmlFor="fruits" className="block text-black font-bold mb-2">
          Ingresar Documento de identidad:
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleDNIChange}
        />
        <div className="flex items-center mt-8 justify-center">
          <button
            className="bg-white hover:bg-transparent hover:border border hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={searchClient}
          >
            {loading ? 'Buscando...' : 'Consultar'}
          </button>
        </div>
      </div>
    </BackofficeLayout>
  );
}
