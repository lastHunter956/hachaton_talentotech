"use client"
import "./TasksCreator.scss"
import { useState } from "react"
import { Textarea } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import useStore from "../../../zustand";

const TasksCreator = ({ setIsOpenCreatorTasks, childrenProject }) => {
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [prioridad, setPrioridad] = useState("")
    const { data: session } = useSession();
    const { setActualizador } = useStore();
    const [vencimiento, setVencimiento] = useState(new Date());

    const crearTarea = async () => {
        const dest = descripcion;
        const inputDate = new Date(vencimiento);
        inputDate.setDate(inputDate.getDate() + 1);
        const adjustedDate = inputDate.toISOString().split('T')[0]; 

        try {
            await axios.post(`/addtasks`, {
                tarea: titulo,
                estado: "Pendiente",
                prioridad: prioridad || "Prioridad 1",
                descripcion: dest,
                client: session?.user?.id,
                fechaDeTarea: adjustedDate || new Date().toISOString().split('T')[0],
                projects: childrenProject
            });

            setTitulo("");
            setDescripcion("");
            setPrioridad("");
            setVencimiento(null);
            toast.success("Tarea creada", {
                duration: 3500,
                position: "top-center",
                style: {
                    fontWeight: 600,
                },
            })
        } catch (error) {
            console.error("Error al crear la tarea:", error);
            toast.error("Error al crear la tarea", {
                duration: 3500,
                position: "top-center",
                style: {
                    fontWeight: 600,
                },
            })
        }
    }

    return (
        <div className="tasks-creator">
            <div className="contenedor">

                <div className="inputs">
                    <form>
                        <Textarea
                            variant="underlined"
                            label="Nombre de la tarea"
                            labelPlacement="top"
                            placeholder="Nombre de la tarea"
                            value={titulo}
                            onValueChange={setTitulo}
                            color="warning"
                            className="w-full textarea-superior"
                        />
                        <Textarea
                            variant="underlined"
                            label="Descripción"
                            labelPlacement="top"
                            placeholder="Descripción de la tarea"
                            value={descripcion}
                            color="warning"
                            onValueChange={setDescripcion}
                            className="w-full"
                        />                    </form>
                    <div className="detalles-de-tarea">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 detalle-vencimiento">
                            <div className="fecha-de-vencimiento">
                                <label htmlFor="vencimiento"> Fecha de vencimiento </label>
                                <input type="date" className="max-w-sm fecha-input"
                                    value={vencimiento} onChange={(e) => setVencimiento(e.target.value)} />
                            </div>
                        </div>
                        <div className="detalle">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button color="danger">
                                        {prioridad === "" ? "Prioridad" : prioridad}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="new" onClick={() => setPrioridad("Prioridad 1")}> Prioridad 1 </DropdownItem>
                                    <DropdownItem key="copy" onClick={() => setPrioridad("Prioridad 2")}> Prioridad 2 </DropdownItem>
                                    <DropdownItem key="edit" onClick={() => setPrioridad("Prioridad 3")}> Prioridad 3 </DropdownItem>
                                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => setPrioridad("")}>
                                        Ninguna prioridad
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="acciones">
                        <div className="boton-de-agregacion">
                            <Button color="default" onClick={() => setIsOpenCreatorTasks(false)}>
                                Cancelar
                            </Button>
                        </div>
                        <div className="boton-de-agregacion">
                            <Button color="warning" onClick={() => { crearTarea(); setActualizador(); }}>
                                Añadir tarea
                            </Button>
                        </div>
                    </div>
                </div>

                <Toaster />

            </div>
        </div>
    )
}

export default TasksCreator