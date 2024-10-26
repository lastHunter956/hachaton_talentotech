import "./CardTask.scss"
import moment from "moment";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import useStore from "../../../zustand.jsx";
import { motion } from "framer-motion";

const CardTask = ({ task }) => {
    const { actualizador, setActualizador } = useStore();
    const [hoverCard, setHoverCard] = useState(false);

    const eliminarTarea = async (id) => {
        try {
            const eliminacionTarea = await axios.delete(`/eliminar-tareas/${id}`);

            if (eliminacionTarea.status === 200) {
                toast.success("Tarea eliminada", {
                    duration: 3500,
                    position: "top-center",
                    style: {
                        fontWeight: 600,
                    },
                })
                setActualizador()
            } else {
                console.log('Error en la respuesta:', eliminacionTarea);
            }
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            toast.error("Error al eliminar la tarea", {
                duration: 3500,
                position: "top-center",
                style: {
                    fontWeight: 600,
                },
            })
        }
    }

    const terminarTarea = async (id) => {
        try {
            const terminarTarea = await axios.put(`${process.env.NEXTAUTH_URL}/eliminar-tareas/${id}`);

            if (terminarTarea.status === 200) {
                toast.success("La tarea pasa a estar realizada", {
                    duration: 3500,
                    position: "top-center",
                    style: {
                        fontWeight: 600,
                    },
                })
                setActualizador()
            } else {
                console.log('Error en la respuesta:', terminarTarea);
            }
        } catch (error) {
            console.error("Error al terminar la tarea:", error);
        }
    }

    return (
        <div className='card-task'>
            <div className="contenedor">
                {task.map((tarea, index) => (
                    <div
                        key={index}
                        className="task-card"
                        onMouseEnter={() => setHoverCard(index)}
                        onMouseLeave={() => setHoverCard(null)}
                    >
                        <h2 className="task-title">{tarea.tarea}</h2>
                        <div className="fecha-iconos">
                            <div>
                                <p className="task-date">Fecha: {tarea?.fechaDeTarea ? moment(tarea?.fechaDeTarea).format("DD/MM/YYYY") : ""}</p>
                            </div>
                            <motion.div
                                className="iconos-de-tarea"
                                transition={{ duration: 0.5 }}
                                animate={{ opacity: hoverCard === index ? 1 : 0 }}
                                style={{ pointerEvents: hoverCard === index ? "auto" : "none" }}
                            >
                                <MdOutlineDone className="icono-check" style={{ display: tarea?.estado === "Terminada" ? "none" : "block" }} onClick={() => terminarTarea(tarea._id)} />
                                <FaTrash className="icono-basura" onClick={() => eliminarTarea(tarea._id)} />
                            </motion.div>
                        </div>
                        <p className="task-description">{tarea?.descripcion}</p>
                        <div className="task-info">
                            <span className="priority" style={{
                                backgroundColor: tarea?.prioridad === "Prioridad 1"
                                    ? "#F44336"
                                    : tarea?.prioridad === "Prioridad 2"
                                        ? "#FFC107"
                                        : tarea?.prioridad === "Prioridad 3"
                                            ? "#4CAF50"
                                            : ""
                            }}>
                                {tarea?.prioridad}
                            </span>
                            <span className="status">{tarea?.estado}</span>
                        </div>
                    </div>
                ))}

                <Toaster />
            </div>
        </div>
    )
}

export default CardTask