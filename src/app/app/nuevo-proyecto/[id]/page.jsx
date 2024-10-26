"use client"
import axios from 'axios'
import Structure from '@/components/Structure/Structure.jsx'
import { GoPlus } from "react-icons/go";
import "../../bandeja-de-entrada/bandeja.scss"
import { useEffect, useState } from 'react'
import CardTask from '@/components/CardTask/CardTask';
import TasksCreator from '@/components/TasksCreator/TasksCreator';
import useStore from '../../../../../zustand.jsx';
import SinTareas from '@/components/SinTareas/SinTareas.jsx';

const NuevoProyecto = ({ params }) => {
    const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);
    const [datos, setDatos] = useState([]);
    const { actualizador } = useStore();
    const [isEmptyTask, setIsEmptyTask] = useState(false);

    useEffect(() => {
        axios.get(`/addtasks`)
            .then((result) => {
                setDatos(result.data.tasks.map((item) => item.projects[0] === params.id ? item : null).filter((item) => item !== null));
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    }, [params.id, actualizador]);

    useEffect(() => {
        if (datos.length === 0) {
            setIsEmptyTask(true);
        } else {
            setIsEmptyTask(false);
        }
    }, [datos]);

    return (
        <Structure>
            <section className="bandeja-de-entrada">
                <div className="titulo">
                    <h2> {params.id} </h2>
                </div>
                <div className="agregar-tareas">
                    {!isOpenCreatorTasks &&
                        <div className="icons" onClick={() => setIsOpenCreatorTasks(true)}>
                            <GoPlus className="icon" />
                            <p> Añadir tareas </p>
                        </div>
                    }
                </div>

                <SinTareas
                    datos={datos}
                    isEmptyTask={isEmptyTask}
                    titulo={"¡Sin tareas!"}
                    subtitulo={"¡Creá una nueva tarea!"}
                />

                {isOpenCreatorTasks &&
                    <TasksCreator setIsOpenCreatorTasks={setIsOpenCreatorTasks} childrenProject={params.id} />
                }

                <CardTask task={datos} />

            </section>
        </Structure>
    )
}

export default NuevoProyecto