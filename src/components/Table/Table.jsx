"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import moment from "moment";
import "./Table.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import useStore from "../../../zustand";
import SinTareas from "../SinTareas/SinTareas.jsx";

const Tablee = () => {
    const [datos, setDatos] = useState([]);
    const [selectedColor, setSelectedColor] = useState("default");
    const [filtroSeleccionado, setFiltroSeleccionado] = useState("todas");
    const [isEmptyTask, setIsEmptyTask] = useState(false);
    const { actualizador } = useStore();         
    useEffect(() => {
        axios.get(`/addtasks`)
            .then((result) => {
                if (filtroSeleccionado === "todas") {
                    setDatos(
                        result.data.tasks.sort((a, b) =>
                            new Date(b.fechaDeTarea) - new Date(a.fechaDeTarea)
                        )
                    )
                    setSelectedColor("default")
                } else if (filtroSeleccionado === "Terminada") {
                    setDatos(
                        result.data.tasks.filter(task => task.estado === "Terminada").sort((a, b) =>
                            new Date(b.fechaDeTarea) - new Date(a.fechaDeTarea)
                        )
                    )
                    setSelectedColor("success")
                } else if (filtroSeleccionado === "Pendiente") {
                    setDatos(
                        result.data.tasks.filter(task => task.estado === "Pendiente").sort((a, b) =>
                            new Date(b.fechaDeTarea) - new Date(a.fechaDeTarea)
                        )
                    )
                    setSelectedColor("warning")
                } else if (filtroSeleccionado === "sinRealizar") {
                    setDatos(
                        result.data.tasks.filter(task => task.estado === "Pendiente" && new Date(task.fechaDeTarea) < new Date()).sort((a, b) =>
                            new Date(b.fechaDeTarea) - new Date(a.fechaDeTarea)
                        )
                    )
                    setSelectedColor("danger")
                }
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    }, [filtroSeleccionado, actualizador]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (datos.length === 0) {
                setIsEmptyTask(true);
            }
        }, 1200);
        return () => clearTimeout(timer);
    }, [datos])

    return (
        <>
            {isEmptyTask ? (
                <SinTareas
                    isEmptyTask={isEmptyTask}
                    titulo={"Sin tareas para mostrar actualmente"}
                    subtitulo={"Creá una nueva tarea"}
                />
            ) : (
                <>
                    <div className="filtro-de-tareas">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                >
                                    Filtrar tareas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="complet" onClick={() => setFiltroSeleccionado("Terminada")}> Tareas completadas </DropdownItem>
                                <DropdownItem key="pend" onClick={() => setFiltroSeleccionado("Pendiente")}> Tareas pendientes </DropdownItem>
                                <DropdownItem key="sin" onClick={() => setFiltroSeleccionado("sinRealizar")}> Tareas vencidas </DropdownItem>
                                <DropdownItem key="all" onClick={() => setFiltroSeleccionado("todas")}> Todas </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="flex flex-col gap-3 tabla-de-historial">
                        <Table
                            color={selectedColor}
                            selectionMode="single"
                            defaultSelectedKeys={["1"]}
                            aria-label="Example static collection table"

                            style={{ zIndex: 0 }}
                        >
                            <TableHeader>
                                <TableColumn>TAREA</TableColumn>
                                <TableColumn>PRIORIDAD</TableColumn>
                                <TableColumn>ESTADO</TableColumn>
                                <TableColumn>FECHA</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {datos.length === 0 ? (
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell> <Skeleton height={20} /> </TableCell>
                                            <TableCell> <Skeleton height={20} /> </TableCell>
                                            <TableCell> <Skeleton height={20} /> </TableCell>
                                            <TableCell> <Skeleton height={20} /> </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    datos.map((tabla, index) => (
                                        <TableRow
                                            key={index}
                                            style={{
                                                textDecoration: moment(tabla.fechaDeTarea).isBefore(moment(), 'day') && tabla.estado === "Pendiente" ? "line-through" : "none"
                                            }}
                                        >
                                            <TableCell>{tabla.tarea}</TableCell>
                                            <TableCell>{tabla.prioridad}</TableCell>
                                            <TableCell>{tabla.estado}</TableCell>
                                            <TableCell>{moment(tabla.fechaDeTarea).format('DD/MM/YYYY')}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                </>
            )}
        </>
    )
}

export default Tablee