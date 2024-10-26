"use client";
import Structure from "@/components/Structure/Structure.jsx";
import "./bandeja.scss"
import { GoPlus } from "react-icons/go";
import TasksCreator from "@/components/TasksCreator/TasksCreator.jsx";
import { useEffect, useState } from "react";
import CardTask from "@/components/CardTask/CardTask.jsx";
import axios from "axios";
import SinTareas from "@/components/SinTareas/SinTareas.jsx";
import useStore from "../../../../zustand";

const BandejaDeEntrada = () => {
  const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);
  const [datos, setDatos] = useState([]);
  const [isEmptyTask, setIsEmptyTask] = useState(false);
  const { actualizador } = useStore();

  useEffect(() => {
    axios.get(`/addtasks`)
      .then((result) => {
        setDatos(result.data.tasks);
        console.log("Datos:", result);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [actualizador]);

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
          <h2> Bandeja de entrada </h2>
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
          titulo={"¡Bienvenido!"}
          subtitulo={"No tenés tareas pendientes"}
        />

        {isOpenCreatorTasks &&
          <TasksCreator setIsOpenCreatorTasks={setIsOpenCreatorTasks} />
        }

        <CardTask task={datos} />

      </section>
    </Structure>
  )
}

export default BandejaDeEntrada;