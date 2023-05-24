import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import { buttons } from "../../components/buttons";

export default function Success() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      router.query.transactionToken === undefined &&
      router.query.token === undefined
    ) {
      return;
    }
    const { transactionToken, token, orderid, amount, dni } = router.query;
    axios
      .post("/api/payment/authTransaction", {
        auth: token,
        token: transactionToken,
        orderid,
        amount,
        dni,
      })
      .then((response) => {
        setData(response.data.data);
        if (response.status === 200) {
          setLoading(false);
          buttons.fire({
            icon: "success",
            title: "Pago realizado con éxito",
            text: "Tu pago se ha realizado con éxito",
          });
          axios.put("/api/backoffice/update/suscription", {
            dni
          }).then((response) => {
            console.log(response)
            console.log('cliente actualizado')
          })
        } else {
          buttons.fire({
            icon: "error",
            title: "Error al procesar tu pago...",
            text: "Parece que hubo un error con tu medio de pago",
          });
          axios.delete("/api/backoffice/delete/client", {
            dni
          }).then((response) => {
            console.log(response)
          })
        }
      })
      .catch((error) => {
        setIsError(true);
        setLoading(false);
        const { response } = error;
        setError(response.data.data);
      });
  }, [router.query]);
  return (
    <>
      <Head>
        <title>Olimpo Club</title>
        <meta name="description" content="Pura Diversion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900" />
        </div>
      )}
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className='absolute top-3 left-10 p-2 md:block hidden'>
            <Image
            src='/logo_olimpoclub.png'
            alt='Olimpo Club'
            width={200}
            height={200}
            />
          </div>
        <div className="fixed gap-4 left-0 top-0 flex flex-col w-full lg:w-auto bg-gradient-to-b from-clightpurple-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-clightpurple-800/30 dark:from-inherit lg:static lg:rounded-xl lg:bg-clightpurple lg:dark:bg-clightpurple-800/30">
          {!loading && !isError && (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-6xl text-tpurple font-bold">
                ¡Gracias por tu compra!
              </h2>

              <article className="my-6">
                <h3 className="text-4xl font-bold text-gray-400">
                  Detalles de la compra
                </h3>
                <p className="text-2xl text-cblue">
                  Número de orden: {router.query.orderid}
                </p>
                <p className="text-2xl text-cblue">
                  {data.dataMap.ACTION_DESCRIPTION}
                </p>
                {/* <p className='text-2xl text-cblue'>Tarjeta: {data.dataMap.CARD}</p> */}
                <p className="text-2xl text-cblue">
                  Marca: {data.dataMap.BRAND.toUpperCase()}
                </p>
                <p className="text-2xl text-cblue">
                  Plan:{" "}
                  <span className="font-bold">
                    {router.query.amount === 50 ? "VIP" : "DELUXE"}
                  </span>
                </p>
                <p className="text-2xl text-cblue">
                  Monto: S/. {router.query.amount}.00
                </p>
                <p className="text-2xl text-cblue">
                  Fecha: {new Date(data.header.ecoreTransactionDate).toLocaleString(
                    "es-ES",
                    { dateStyle: "full", timeStyle: "short" }
                  )}
                </p>
                <div className="border-t border-cblue-300 my-6" />
                <p className="text-2xl text-cblue">
                  Nombre: {router.query.name}
                </p>
                <p className="text-2xl text-cblue">DNI: {router.query.dni}</p>
                <p className="text-2xl text-cblue">
                  Email: {router.query.email}
                </p>
                <p className="text-2xl text-cblue">
                  Teléfono: {router.query.phone}
                </p>
                <p className="text-2xl text-cblue">
                  Tu pago ha sido procesado, <br />
                  Tu suscripcion arrancha desde este momento, <br />
                  ya puedes disfrutar de nuestras instalaciones y <br /> de
                  todos los beneficio que tienes <br />
                  por ser miembro de Olimpo Club.{" "}
                </p>
                
              </article>
            </div>
          )}

          {error && isError && (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold text-tpurple">
                ¡Hubo un error con tu compra!
              </h2>
              <article className="my-6">
                <div className="border-t border-gray-300 my-6" />
                <h3 className="text-4xl text-cblue">Detalles del error</h3>
                <p className="text-2xl text-cblue">
                  {error.data.ACTION_DESCRIPTION}
                </p>
                <p className="text-2xl text-cblue">
                  {new Date(error.header.ecoreTransactionDate).toLocaleString(
                    "es-ES",
                    { dateStyle: "full", timeStyle: "short" }
                  )}
                </p>
              </article>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
