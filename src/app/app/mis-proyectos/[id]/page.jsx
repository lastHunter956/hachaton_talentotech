"use client"
import "../../bandeja-de-entrada/bandeja.scss"
import Structure from '@/components/Structure/Structure'
import { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import TasksCreator from "@/components/TasksCreator/TasksCreator";
import CardTask from "@/components/CardTask/CardTask";

const ProjectsById = ({ params }) => {
    const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);
    const [datos, setDatos] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <Structure>
            <section className="bandeja-de-entrada">
                <div className="titulo">
                    <h2> {params.id} </h2>
                </div>
                <div className="agregar-tareas">
                    <div className="icons" onClick={() => {setIsOpenCreatorTasks(true)}}>
                        <GoPlus className="icon" />
                        <p> Añadir tareas </p>
                    </div>
                </div>

            {isOpenCreatorTasks &&
                <TasksCreator setIsOpenCreatorTasks={setIsOpenCreatorTasks} />
            }

            <CardTask task={datos} />

            </section>
        </Structure>
    )
}

export default ProjectsById