"use client"
import "./hoy.scss"
import { GoPlus } from "react-icons/go";
import Structure from "@/components/Structure/Structure.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import CardTask from "@/components/CardTask/CardTask.jsx";
import TasksCreator from "@/components/TasksCreator/TasksCreator.jsx";
import useStore from "../../../../zustand.jsx";
import SinTareas from "@/components/SinTareas/SinTareas.jsx";

const Hoy = () => {
    const [datos, setDatos] = useState([]);
    const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);
    const [setUpdateData] = useState(false);
    const { actualizador } = useStore();
    const [isEmptyTask, setIsEmptyTask] = useState(false);

    useEffect(() => {
        axios.get(`/addtasks`)
            .then((result) => {
                setDatos(
                    result.data.tasks.filter(
                        (task) => new Date(task.fechaDeTarea).toDateString() === new Date().toDateString()
                    )
                );
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    }, [isOpenCreatorTasks, actualizador]);

    useEffect(() => {
        if (datos.length === 0) {
            setIsEmptyTask(true);
        } else {
            setIsEmptyTask(false);
        }
    }, [datos]);

    return (
        <Structure>
            <section className="desktop-hoy">
                <div className="titulo">
                    <h2> Hoy </h2>
                </div>
                <div className="agregar-tareas">
                    <div className="icons" onClick={() => setIsOpenCreatorTasks(true)}>
                        <GoPlus className="icon" />
                        <p> Añadir tareas </p>
                    </div>
                </div>

                <SinTareas
                    datos={datos}
                    isEmptyTask={isEmptyTask}
                    titulo={"¡Que nada se te escape hoy!"}
                    subtitulo={"Anotá tus tareas y convertí el día en un día."}
                />

                {isOpenCreatorTasks &&
                    <TasksCreator setUpdateData={setUpdateData} setIsOpenCreatorTasks={setIsOpenCreatorTasks} />
                }

                <CardTask task={datos} />

            </section>
        </Structure>
    )
}

export default Hoy