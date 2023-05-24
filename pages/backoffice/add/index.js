import { useForm } from "react-hook-form"
import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";

import { buttons } from "../../../components/buttons";
import BackofficeLayout from "../../../components/layout";

export default function AddClient () {

  const router = useRouter()
  const [fileName, setFileName] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, ...formState },
  } = useForm({
    mode: "onChange",

    defaultValues: {
      nombre: "",

      apellido: "",

      dni: "",

      telefono: "",
    },
  });

  const messageManager = (data) => {
    //send message to whatsapp
    let message = `*${data.nombre} ${data.apellido}*\n\n`;

    message += `*DNI:* ${data.dni}\n\n`;

    message += `*Teléfono:* ${data.telefono}\n\n`;

    message += `*Email:* ${data.email}\n\n`;

    message += `*Fecha:* ${new Date().toLocaleString()}\n\n`;
  };

  const validateImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const name = file.name;
      setFileName(name);

      try {
        if (file.length > 2097152) throw "La imagen no debe ser mayor a 10MB.";
        else if (file.type !== "image/jpeg" && file.type !== "image/jpg")
          throw "Debe ser una imagen en formato JPG.";

        setImageLoaded(true);
      } catch (ex) {
        buttons.fire({ icon: "error", text: ex });

        e.target.value = "";

        setImageLoaded(false);
      }
    } else {
      setImageLoaded(false);
    }
  };

  const send = (info) => {
    if (!imageLoaded) {
      buttons.fire({ icon: "error", text: "Debes cargar la foto de tu DNI." });

      return;
    }

    const file = document.getElementById("file").files[0];

    let fd = new FormData();

    fd.append("_method", "PUT");

    fd.append("nombre", info.nombre);

    fd.append("dni", info.dni);

    fd.append("telefono", info.telefono);

    fd.append("email", info.email);

    fd.append("edad", info.edad);

    fd.append("file", file);

    axios.post('/api/backoffice/save/photo', fd).then(
      (resp) => {
        const { data } = resp;
        const body = {
          nombre: info.nombre,
          apellido: info.apellido,
          dni: info.dni,
          telefono: info.telefono,
          email: info.email,
          edad: info.edad,
          foto: data.path,
        }
        axios.post('/api/backoffice/add/client', body).then(
          (resp) => 
          buttons.fire({
            icon: "success",
            title: "Éxito",
            text: "Cliente agregado correctamente.",
          }).then(() => router.push('/backoffice/list'))
        ).catch(err => 
          buttons.fire({
            icon: "error",
            text: "Lo sentimos, hubo un error al procesar la información.",
          }))

        // onSubmit({ ...data, dni_status: 1 });
        // onSubmit(router);

        messageManager(data);
      },
      (err) => {
        if (err?.response?.data?.error) {
          buttons.fire({ icon: "error", text: err.response.data.error });
        } else {
          buttons.fire({
            icon: "error",
            text: "Lo sentimos, hubo un error al procesar la información.",
          });
        }
      }
    );
  };

  return (
    <BackofficeLayout>
      <div>
        <p className='font-mono font-bold text-3xl text-black'>Ingresar Nuevo Cliente</p>
        <form className='max-w-lg mx-auto' onSubmit={handleSubmit(send)} encType='multipart/form-data'>
          <div className='my-4'>
            <input
              className='bg-transparent shadow w-full appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none  focus:border-blue-500 text-black'
              id='nombre'
              {...register("nombre", {
                required: "Nombre completo es requerido",

                pattern: {
                  value: /^[a-zA-Z ]+$/,

                  message: "Solo se admiten letras",
                },

                maxLength: {
                  value: 50,

                  message: "Solo se admite 50 caracteres como máximo",
                },
              })}
              required
              type='text'
              placeholder='Nombres'
            />
          </div>
          <div className='my-4'>
            <input
              className='bg-transparent shadow w-full appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none  focus:border-blue-500 text-black'
              id='apellido'
              {...register("apellido", {
                required: "Apellidos completo es requerido",

                pattern: {
                  value: /^[a-zA-Z ]+$/,

                  message: "Solo se admiten letras",
                },

                maxLength: {
                  value: 50,

                  message: "Solo se admite 50 caracteres como máximo",
                },
              })}
              required
              type='text'
              placeholder='Apellidos'
            />
          </div>
          <div className='my-4'>
            <input
              className='bg-transparent shadow w-full appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none  focus:border-blue-500 text-black'
              id='dni'
              type='text'
              placeholder='DNI'
              {...register("dni", {
                required: "El DNI es requerido",

                pattern: {
                  value: /[0-9]+/,

                  message: "Solo se admiten números",
                },

                maxLength: {
                  value: 16,
                  message: "Solo se admite 16 dígitos como máximo",
                },
              })}
              required
            />
          </div>
          <div className='my-4'>
            <input
              className='bg-transparent shadow w-full appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none  focus:border-blue-500 text-black'
              id='celular'
              type='text'
              {...register("telefono", {
                required: "El Teléfono es requerido",

                pattern: {
                  value: /[0-9]+/,

                  message: "Solo se admiten números",
                },

                maxLength: {
                  value: 16,

                  message: "Solo se admite 16 dígitos como máximo",
                },
              })}
              required
              placeholder='Celular'
            />
          </div>
          <div className='my-4'>
            <input
              className='bg-transparent shadow w-full placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none  focus:border-blue-500 text-black'
              id='edad'
              type='text'
              placeholder='Edad'
              {...register("edad", {
                required: "Tu edad es requerida",

                pattern: {
                  value: /[0-9]+/,

                  message: "Solo se admiten números",
                },

                maxLength: {
                  value: 16,

                  message: "Solo se admite 16 dígitos como máximo",
                },
              })}
              required
            />
          </div>
          <div className='my-4'>
            <input
              className='bg-transparent shadow w-full placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4  leading-tight focus:outline-none  focus:border-blue-500'
              id='email'
              type='email'
              
              placeholder='Email'
              {...register("email", {
                required: "Tu email es requerida",

                maxLength: {
                  value: 50,

                  message: "Solo se admite 50 dígitos como máximo",
                },
              })}
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label
              className='block text-black font-bold mb-2'
              htmlFor='fecha'
              onChange={handleEmail}
            >
              Fecha de inicio
            </label>
            <div className='flex'>
              <div className='mr-2'>
                <input
                  className='placeholder-red-500 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline form-date bg-transparent'
                  id='fecha'
                  type='date'
                  placeholder='YYYY-MM-DD'
                />
              </div>
            </div>
          </div> */}

          <div className='mb-4'>
            <label
              className='block text-black font-bold mb-2'
              htmlFor='foto'
            >
              Fotografía
            </label>
            <div className='flex items-center '>
              <label className='w-full flex flex-col items-center px-4 py-6 bg-transparent text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white '>
                <svg
                  className='w-8 h-8'
                  fill='black'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 14a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 100-12 6 6 0 000 12zm5.94-8.06a2 2 0 11-2.83 2.83 2 2 0 012.83-2.83zM10 18a8 8 0 110-16 8 8 0 010 16z'
                    clipRule='evenodd'
                  />
                </svg>
                <span id='file-name' className='mt-2 text-base leading-normal text-black'>
                {fileName.length > 0 ? (
                  fileName
                ) : (
                  'Adjuntar imagen'
                )}
                </span>
                <input
                  type='file'
                  id='file'
                  className='hidden'
                  accept="image/jpeg"
                  onChange={validateImage}
                />
              </label>
            </div>
          </div>

          <div className='flex items-center mt-8 justify-center'>
            <button
              className='bg-white hover:border border text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Agregar cliente
            </button>
          </div>
        </form>
      </div>
    </BackofficeLayout>
  )
}
