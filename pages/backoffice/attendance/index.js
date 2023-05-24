import { useState, useEffect } from "react";
import axios from "axios";
import BackofficeLayout from "../../../components/layout";
export default function Attendance() {
  const [attendances, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAttendance = async () => {
    try {
      const response = await axios.get("/api/backoffice/list/attendance");
      const { data } = response;
      setAttendance(data.map((item) => {
        return {
          ...item,
          date: new Date(item.date).toLocaleDateString(),
        }
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <BackofficeLayout>
      <div>
        <p className="font-mono font-bold text-3xl text-black">
          Lista de Asistencias
        </p>
      </div>
      <div className="overflow-x-auto bg-transparent">
        <table className="table-auto mx-auto border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-black">ID</th>
              <th className="px-4 py-2 border text-black">Nombre</th>
              <th className="px-4 py-2 border text-black">DNI</th>
              <th className="px-4 py-2 border text-black">Fecha</th>
              <th className="px-4 py-2 border text-black">Sede</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="border p-2">Cargando...</td>
              </tr>
            )}
            {loading === false &&
              attendances.length > 0 &&
              attendances.map((attendance) => {
                return (
                  <tr key={attendance.id}>
                    <td className="border p-2 text-black">{attendance.id}</td>
                    <td className="border p-2 text-black">{attendance.nombre} {attendance.apellido}</td>
                    <td className="border p-2 text-black">{attendance.dni}</td>
                    <td className="border p-2 text-black">{attendance.date}</td>
                    <td className="border p-2 text-black">{attendance.sede}</td>
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
