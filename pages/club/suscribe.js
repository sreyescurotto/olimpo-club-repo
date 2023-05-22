/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import Script from "next/script";

import { buttons } from "../../components/buttons";

export default function Suscribe() {
  const router = useRouter();
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };
  const orderID = generateOrderNumber();
  const [merchandid, setMerchandid] = useState();
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState(100);
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleName = (nam) => {
    setName(nam);
  };
  const handleDni = (dn) => {
    setDni(dn);
  };
  const handlePhone = (ph) => {
    setPhone(ph);
  };
  const handleAge = (ag) => {
    setAge(ag);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };

  const checkData = () => {
    if (name === "") {
      alert("Debe Ingresar su nombre para continuar");
      return;
    }
    if (dni === "") {
      alert("Debe Ingresar su DNI para continuar");
      return;
    }

    if (phone === "") {
      alert("Debe Ingresar su número de celular para continuar");
      return;
    }

    if (age === "") {
      alert("Debe Ingresar su edad para continuar");
      return;
    }

    if (email === "") {
      alert("Ingresar su correo electrónico para continuar");
    }
  };

  function createOrder() {
    checkData();
    const options = {
      method: "POST",
      url: `https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/${merchandid}`,
      // url: `https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/${merchandid}`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: token,
      },
      data: {
        antifraud: {
          merchantDefineData: {
            MDD4: email,
            MDD21: 1,
            MDD32: dni,
            MDD75: "Registrado",
            MDD77: 0,
          },
        },
        recurrenceMaxAmount: 100.0,
        channel: "web",
        amount: `${amount}.0`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        openForm(response.data.sessionKey);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const openForm = (sessionKey) => {
    // eslint-disable-next-line no-undef
    VisanetCheckout.configure({
      sessiontoken: sessionKey,
      channel: "web",
      merchantid: merchandid,
      purchasenumber: orderID,
      recurrence: "TRUE",
      recurrencetype: "FIXED",
      recurrencefrequency: "MONTHLY",
      recurrencemaxamount: 100.0,
      recurrenceamount: `${amount}.0`,
      buttoncolor: "GRAY",
      amount: `${amount}.0`,
      expirationminutes: "5",
      timeouturl: "https://olimpoclubperu.com/paymentError",
      merchantname: "Olimpo Club",
      cardholdername: "sergio",
      cardholderlastname: "reyes",
      cardholderemail: "sreyescurotto@gmail.com",
      method: "POST",
      action: `/api/payment/transition?token=${token}&orderid=${orderID}&amount=${amount}&email=${email}&name=${name}&dni=${dni}&phone=${phone}&age=${age}`,
      complete: function (params) {
        <h1>LOADING</h1>;
      },
    });
    // eslint-disable-next-line no-undef
    VisanetCheckout.open();
  };

  const saveUser = () => {
    buttons
      .fire({
        title: "¡Gracias por suscribirte!",
        text: "En breve nos pondremos en contacto contigo",
        icon: "success",
      })
      .then(() => {
        createOrder();
      });
    // const file = selectedFile
    // const formData = new FormData()
    // formData.append('nombre', name)
    // formData.append('dni', dni)
    // formData.append('celular', phone)
    // formData.append('edad', age)
    // formData.append('email', email)
    // formData.append('file', file)
    // axios
    //   .post('/api/backoffice/add/client', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log(error.response)
    //   })
  };

  useEffect(() => {
    axios.get("/api/payment/token").then((response) => {
      setToken(response.data.token);
      setMerchandid(response.data.merchantId);
    });

    const { amount } = router.query;
    if (amount) {
      setAmount(amount);
    } else {
      setAmount(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Olimpo Club</title>
        <meta name="description" content="Pura Diversion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        type="text/javascript"
        // src='https://static-content.vnforapps.com/v2/js/checkout.js'
        src="https://static-content-qas.vnforapps.com/v2/js/checkout.js"
      />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="fixed left-0 top-0 flex flex-col w-full lg:w-auto bg-gradient-to-b from-clightpurple-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-clightpurple-800/30 dark:from-inherit lg:static lg:rounded-xl lg:bg-clightpurple-200 lg:dark:bg-clightpurple-800/30">
          <div>
            <p className="font-bold text-3xl text-tpurple">Nuevo Socio</p>
            <form
              className="max-w-lg mx-auto p-6"
              encType="multipart/form-data"
            >
              <div className="my-4">
                <input
                  className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold leading-tight focus:outline-none  focus:border-tpurple"
                  id="nombre"
                  type="text"
                  onChange={(e) => handleName(e.target.value)}
                  placeholder="Nombre completo"
                />
              </div>
              <div className="my-4">
                <input
                  className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold leading-tight focus:outline-none  focus:border-tpurple"
                  id="dni"
                  type="text"
                  onChange={(e) => handleDni(e.target.value)}
                  placeholder="DNI"
                />
              </div>
              <div className="my-4">
                <input
                  className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold font-bold leading-tight focus:outline-none focus:border-tpurple"
                  id="celular"
                  type="text"
                  onChange={(e) => handlePhone(e.target.value)}
                  placeholder="Celular"
                />
              </div>
              <div className="my-4">
                <input
                  className="bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold font-bold leading-tight focus:outline-none focus:border-tpurple"
                  id="edad"
                  type="text"
                  onChange={(e) => handleAge(e.target.value)}
                  placeholder="Edad"
                />
              </div>
              <div className="my-4">
                <input
                  className="bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold font-bold leading-tight focus:outline-none focus:border-tpurple"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                  placeholder="Correo Electrónico"
                />
              </div>
              <div className="my-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="amount"
                >
                  Monto de suscripción
                </label>
                <input
                  className="bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold leading-tight focus:outline-none focus:border-tpurple"
                  id="amount"
                  type="amount"
                  disabled
                  value={`S/. ${amount}.00`}
                />
              </div>
              <div className="my-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="frecuency"
                >
                  Frecuencia de pago
                </label>
                <input
                  className="bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-tpurple font-bold leading-tight focus:outline-none focus:border-tpurple"
                  id="frecuency"
                  type="frecuency"
                  disabled
                  value="Mensual"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="foto"
                >
                  Fotografía
                </label>
                <div className="flex items-center ">
                  <label className="w-64 flex flex-col items-center px-4 py-6 bg-transparent text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white ">
                    <svg className="w-8 h-8" fill="tpurple" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 14a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 100-12 6 6 0 000 12zm5.94-8.06a2 2 0 11-2.83 2.83 2 2 0 012.83-2.83zM10 18a8 8 0 110-16 8 8 0 010 16z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      id="file-name"
                      className="mt-2 text-base leading-normal text-tpurple"
                    >
                      {selectedFile ? selectedFile.name : "Seleccionar archivo"}
                    </span>
                    <input
                      type="file"
                      id="foto"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <input type="checkbox" label="" id="terms" name="terms" />
                  <label
                    className="text-tpurple cursor-pointer"
                    htmlFor="terms"
                  >
                    Acepto los términos y condiciones
                  </label>
                </div>
              </div>
            </form>
          </div>
          <button
            onClick={createOrder}
            className="bg-white text-black font-bold rounded-md py-2 px-4 hover:bg-gray-200 transition-colors duration-300 max-w-md self-center"
          >
            Pagar
          </button>
        </div>
      </main>
    </>
  );
}
