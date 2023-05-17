import React from "react";

const Modal = ({ isOpen, onClose, user, registerAttendance, search = false }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="bg-white rounded-lg p-3 z-10">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.707 5.293a1 1 0 0 0-1.414 0L12 10.586l-5.293-5.293a1 1 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0 0-1.414z" />
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <h2 className="text-lg text-black font-semibold mb-2">Resultado</h2>
          <div className="text-gray-600">
            <p>
                {user ? `${user.nombre} ${user.apellido}` : ""}
            </p>
            <p>
                DNI: {user ? user.dni : ""}
            </p>
            <p>
                Celular: {user ? user.telefono : ""}
            </p>
            <div>
                Suscripción: 
                {user.suscrito === 1 ? (
                <span className="inline-block px-2 py-1 text-s font-bold leading-none text-white bg-green-500 rounded-full ms-3">
                    Activa
                </span>
                ) : (
                <span className="inline-block px-2 py-1 text-s font-bold leading-none text-white bg-red-500 rounded-full ms-3">
                    Inactiva
                </span>
                )}
            </div>
            <div>
                Foto: 
                <img src={user.foto} alt="Foto" className="w-32 h-32"/>
            </div>
          </div>
        </div>
        {search && 
            <div className="mt-3">
                <button className="px-4 py-2 rounded bg-green-500 text-black hover:bg-black hover:text-white" onClick={() => registerAttendance(user.id)}
                >Registrar Asistencia</button>
            </div>
        }
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
