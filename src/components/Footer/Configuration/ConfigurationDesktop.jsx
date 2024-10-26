"use client"
import "./ConfiguracionDesktop.scss"
import { IoMdClose } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ConfigurationDesktop = ({ setActiveModal }) => {
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    provincia: "",
    localidad: "",
    calle: "",
    codigoPostal: ""
  })
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { data: session } = useSession();
  const [datosCargados, setDatosCargados] = useState([]);

  useEffect(() => {
    if (Object.values(datosPersonales).every(val => val === "")) {
      setIsButtonVisible(false)
    } else {
      setIsButtonVisible(true)
    }
  }, [datosPersonales])

  const cancelarDatos = async () => {
    setDatosPersonales({
      nombre: "",
      apellido: "",
      edad: "",
      telefono: "",
      provincia: "",
      localidad: "",
      calle: "",
      codigoPostal: ""
    })
  }

  const actualizarDatos = async () => {
    try {
      const result = await axios.post(`/datos-personales`, {
        name: datosPersonales.nombre,
        lastName: datosPersonales.apellido,
        years: datosPersonales.edad,
        telefono: datosPersonales.telefono,
        localidad: datosPersonales.localidad,
        provincia: datosPersonales.provincia,
        calle: datosPersonales.calle,
        codigoPostal: datosPersonales.codigoPostal
      })

      if (result.status === 200) {
        toast.success('Datos agregados exitosamente', {
          position: "top-center",
          duration: 3500
        })
        setDatosPersonales({
          nombre: "",
          apellido: "",
          edad: "",
          telefono: "",
          provincia: "",
          localidad: "",
          calle: "",
          codigoPostal: ""
        })
      } else {
        console.log(`Error porque los datos del cliente ya existen`);

      }

    } catch (error) {
      console.log(error);
    }
  }

  const restablecerDatos = async () => {
    try {
      const result = await axios.post(`/datos-personales`, {
        name: "",
        lastName: "",
        years: "",
        telefono: "",
        localidad: "",
        provincia: "",
        calle: "",
        codigoPostal: ""
      })
      if (result.status === 200) {
        toast.success('Datos restablecidas exitosamente', {
          position: "top-center",
          duration: 3500
        })
      } else {
        console.log(`Error porque los datos del cliente ya existen`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`/datos-personales`);
        setDatosCargados(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="configuracion-desktop">
      <div className="contenedor-configuracion-desktop">

        <div className="contenedor-superior-config-desktop">
          <div className="icono-texto">
            <MdOutlineSpaceDashboard className="icono" />
            <p>Cuenta</p>
          </div>
          <div className="close">
            <IoMdClose className="icono" onClick={() => setActiveModal(false)} />
          </div>
        </div>

        <div className="tipo-de-plan">
          <div className="plan">
            <p> Plan único y gratuito  </p>
          </div>
        </div>

        <div className="formulario-de-datos-personales-desktop">
          <div className="contenedor-de-datos">
            <label className="contenedor-de-datos-label" htmlFor="nombre">Email</label>
            <input type="email" placeholder={session?.user?.email} readOnly className="contenedor-de-datos-input c-d-d-i" />
          </div>
          <div className="contenedor-de-datos">
            <label className="contenedor-de-datos-label" htmlFor="nombre">Nombre</label>
            <input
              style={{ color: datosCargados.name && "var(--font-color-secundario)" }}
              type="text" placeholder="Lucas" className="contenedor-de-datos-input" value={!datosCargados.name ? datosPersonales.nombre : datosCargados.name} onChange={e => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })} readOnly={datosCargados.name} />
          </div>
          <div className="contenedor-de-datos">
            <label className="contenedor-de-datos-label" htmlFor="apellido">Apellido</label>
            <input
              style={{ color: datosCargados.lastName && "var(--font-color-secundario)" }}
              type="text" placeholder="Perez" className="contenedor-de-datos-input" value={!datosCargados.lastName ? datosPersonales.apellido : datosPersonales.apellido} onChange={e => setDatosPersonales({ ...datosPersonales, apellido: e.target.value })} readOnly={datosCargados.lastName} />
          </div>
          <h3 className="titulo-datos-personales">Datos personales</h3>
          <div className="contenedor-de-datos-privados">
            <div className="cont-form">
              <label className="cddp-label" htmlFor="edad">Edad</label>
              <input
                style={{ color: datosCargados.years && "var(--font-color-secundario)" }}
                type="number" placeholder="18" className="cddp-input" value={!datosCargados.years ? datosPersonales.edad : datosCargados.years} onChange={e => setDatosPersonales({ ...datosPersonales, edad: e.target.value })} readOnly={datosCargados.years} />
            </div>
            <div className="cont-form">
              <label className="cddp-label" htmlFor="telefono">Telefono</label>
              <input
                style={{ color: datosCargados.telefono && "var(--font-color-secundario)" }}
                type="number" placeholder="123456789" value={!datosCargados.telefono ? datosPersonales.telefono : datosCargados.telefono} onChange={e => setDatosPersonales({ ...datosPersonales, telefono: e.target.value })} className="cddp-input" readOnly={datosCargados.telefono} />
            </div>
            <div className="cont-form">
              <label className="cddp-label" htmlFor="provincia">Provincia</label>
              <input
                style={{ color: datosCargados.provincia && "var(--font-color-secundario)" }}
                type="text" placeholder="Buenos Aires" value={!datosCargados.provincia ? datosPersonales.provincia : datosCargados.provincia} onChange={e => setDatosPersonales({ ...datosPersonales, provincia: e.target.value })} className="cddp-input" readOnly={datosCargados.provincia} />
            </div>
            <div className="cont-form">
              <label className="cddp-label" htmlFor="localidad">Localidad</label>
              <input
                style={{ color: datosCargados.localidad && "var(--font-color-secundario)" }}
                type="text" placeholder="San Isidro" value={!datosCargados.localidad ? datosPersonales.localidad : datosCargados.localidad} onChange={e => setDatosPersonales({ ...datosPersonales, localidad: e.target.value })} className="cddp-input" readOnly={datosCargados.localidad} />
            </div>
            <div className="cont-form">
              <label className="cddp-label" htmlFor="calle">Calle</label>
              <input
                style={{ color: datosCargados.calle && "var(--font-color-secundario)" }}
                type="text" placeholder="Av. Santa Fe" className="cddp-input" value={!datosCargados.calle ? datosPersonales.calle : datosCargados.calle} onChange={e => setDatosPersonales({ ...datosPersonales, calle: e.target.value })} readOnly={datosCargados.calle} />
            </div>
            <div className="cont-form">
              <label className="cddp-label" htmlFor="telefono">Codigo postal</label>
              <input
                style={{ color: datosCargados.codigoPostal && "var(--font-color-secundario)" }}
                type="number" placeholder="2020" className="cddp-input" value={!datosCargados.codigoPostal ? datosPersonales.codigoPostal : datosCargados.codigoPostal} onChange={e => setDatosPersonales({ ...datosPersonales, codigoPostal: e.target.value })} readOnly={datosCargados.codigoPostal} />
            </div>
          </div>
        </div>

        <div className="eliminar-cuenta">
          <p className="texto"> Eliminar cuenta </p>
          <p> Esto eliminará inmediatamente toda tu información, incluyendo tareas, proyectos y más. Esta acción no se puede deshacer.</p>
          <button className="boton-eliminar-cuenta">
            Eliminar cuenta
          </button>
        </div>

        {datosCargados.name ||
          datosCargados.lastName ||
          datosCargados.telefono ||
          datosCargados.years ||
          datosCargados.provincia ||
          datosCargados.localidad ||
          datosCargados.calle ||
          datosCargados.provincia ||
          datosCargados.codigoPostal
          ?
          <div className="contenedor-de-boton-restablecer">
            <div className="boton-restablecer-update" onClick={restablecerDatos}> Restablecer </div>
          </div>
          :
          null
        }

        {isButtonVisible &&
          <motion.div
            transition={{ duration: 0.6, ease: "easeInOut" }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="contenedor-actualizador-datos">
            <div className="boton-cancelar-update" onClick={cancelarDatos}> Cancelar </div>

            {datosCargados.name ||
              datosCargados.lastName ||
              datosCargados.telefono ||
              datosCargados.years ||
              datosCargados.provincia ||
              datosCargados.localidad ||
              datosCargados.calle ||
              datosCargados.provincia ||
              datosCargados.codigoPostal ?
              <div className="boton-restablecer-update" onClick={restablecerDatos}> Restablecer </div>
              :
              <div className="boton-actualizar-update" onClick={actualizarDatos}> Actualizar </div>
            }

          </motion.div>
        }

        <Toaster />

      </div>
    </motion.div>
  )
}

export default ConfigurationDesktop