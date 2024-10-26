"use client"
import "./Modals.scss"
import { useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useSession } from "next-auth/react"
import axios from "axios"
import { motion } from "framer-motion"
import useStore from "../../../zustand.jsx"

const ModalProjectMobile = ({ setModalProject }) => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const { data: session } = useSession()
  const { actualizador } = useStore();

  const crearProyecto = async () => {
    const idUser = session?.user.id;

    try {
      const result = await axios.post(`/nuevo-proyecto`, {
        proyecto: nombreProyecto,
        client: idUser
      });

      if (result.status === 200 || result.status === 201) {
        setNombreProyecto("");
        toast.success('Proyecto nuevo creado exitosamente', {
          position: "top-center",
          duration: 3500,
          style: {
            zIndex: 9999
          },
        })
        setModalProject(false);
        actualizador();
      } else {
        console.log('Error en la respuesta:', result);
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <motion.div className="modal-project-mobile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="contenedor-modal-project-mobile">

        <div className="formulario-del-modal">
          <textarea
            type="text"
            placeholder="Nombre del proyecto"
            className="input-del-proyecto"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
          />
        </div>

        <div className="botones">
          <div className="bot">
            <div className="boton-accion-cancelar" onClick={() => { setModalProject(false); actualizador }} >
              Cancelar
            </div>
            <div className="boton-accion-agregar" onClick={crearProyecto}>
              Añadir proyecto
            </div>
          </div>
        </div>

        <Toaster />

      </div>
    </motion.div>
  )
}

export default ModalProjectMobile