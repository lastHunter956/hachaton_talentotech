"use client";
import "./Header.scss";
import { motion } from "framer-motion"
import axios from "axios";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { CiInboxIn, CiCalendarDate, CiLogout } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LuPlus } from "react-icons/lu";
import { Toaster, toast } from "react-hot-toast";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import useStore from "../../../zustand";
import { Spinner } from "@nextui-org/react";
import ModalTaskMobile from "../Modals/ModalTaskMobile";
import ConfigurationDesktop from "../Footer/Configuration/ConfigurationDesktop";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("/app/hoy");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession()
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [arrayProyectos, setArrayProyectos] = useState([]);
  const { actualizador, setActualizador } = useStore();
  const [isOpenModalTask, setIsOpenModalTask] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState("");
  const pathName = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const cerrarSesion = () => {
    signOut();
  }

  const crearProyecto = async () => {
    const idUser = session?.user.id;

    try {
      const result = await axios.post(`/nuevo-proyecto`, {
        proyecto: nombreProyecto,
        client: idUser
      });

      if (result.status === 200 || result.status === 201) {
        setNombreProyecto("");
        onOpenChange(false);
        toast.success('Proyecto nuevo creado exitosamente', {
          position: "top-center",
          duration: 3500
        })
      } else {
        console.log('Error en la respuesta:', result);
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  useEffect(() => {
    try {
      axios.get(`/nuevo-proyecto`)
        .then(response => {
          setArrayProyectos(response.data.datos);
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error);
    }
  }, [actualizador]);

  const eliminarProyecto = async (id) => {
    try {
      const eliminarTarea = await axios.delete(`/nuevo-proyecto`, {
        data: {
          id: id
        }
      });

      if (eliminarTarea.status === 200) {
        toast.success('Proyecto eliminado exitosamente', {
          position: "top-center",
          duration: 3500
        });
        console.log(`El id mandado es: ${id}`);
        setArrayProyectos(arrayProyectos.filter((proyecto) => proyecto.id !== id));
      } else {
        console.log('Error en la respuesta:', eliminarTarea);
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSkeleton(false);
    }, 800);
  }, []);

  useEffect(() => {
    setCategoriaSeleccionada(pathName);
  }, [pathName])

  useEffect(() => {
    const idUser = session?.user.image;
    const imagenDefecto = "/img/imagen-perfil.jpg";
    setImagenPerfil(session?.user.image);

    if (!idUser) {
      setImagenPerfil(imagenDefecto);
    }
  }, [pathName, session?.user.image]);

  return (
    <header className="header-raiz">
      <motion.header className="header-desktop"
        animate={{ width: isMenuOpen ? '70px' : 'var(--width-sidebar)' }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        style={{ overflow: "hidden" }}
      >
        <nav>
          <div className="categorias">
            <motion.div className="nombre-dashboard">
              <div className="nombres" >
                {isMenuOpen ?
                  (
                    <div className="boton-dashboard" onClick={toggleMenu}>
                      <MdOutlineSpaceDashboard className="icon" />
                    </div>
                  ) : (
                    <Avatar onClick={() => setActiveModal(true)} src={imagenPerfil} style={{ cursor: 'pointer' }} size="md" />
                  )}
                <motion.div
                  onClick={() => setActiveModal(true)}
                  animate={{ display: isMenuOpen ? "none" : "flex" }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{ display: 'flex', alignItems: 'center' }} >
                  <p> {session?.user?.email === "" ? "Nuevo usuario" : session?.user?.email} </p>
                  <IoIosArrowDown className="icon" />
                </motion.div>
              </div>
              <motion.div
                animate={{ display: isMenuOpen ? "none" : "flex" }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="boton-dashboard" onClick={toggleMenu}>
                <MdOutlineSpaceDashboard className="icon" />
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ x: isMenuOpen ? -100 : 0, opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.8 }}
              className="lista-de-categorias">
              <div className="cats">
                <div className="icono-nombre" onClick={() => setIsOpenModalTask(!isOpenModalTask)}>
                  <FaPlusCircle className="icon" />
                  <p> Añadir tarea </p>
                </div>
                <Link href="/app/bandeja-de-entrada">
                  <div className="icono-nombre" style={{ backgroundColor: categoriaSeleccionada === "/app/bandeja-de-entrada" && "var(--fondo-hover)" }}>
                    <CiInboxIn className="icon" />
                    <p> Bandeja de entrada </p>
                  </div>
                </Link>
                <Link href="/app/hoy">
                  <div className="icono-nombre" style={{ backgroundColor: categoriaSeleccionada === "/app/hoy" && "var(--fondo-hover)" }}>
                    <CiCalendarDate className="icon" />
                    <p> Hoy </p>
                  </div>
                </Link>
                <Link href="/app/historial-de-tareas">
                  <div className="icono-nombre" style={{ backgroundColor: categoriaSeleccionada === "/app/historial-de-tareas" && "var(--fondo-hover)" }}>
                    <GoHistory className="icon" />
                    <p> Historial de tareas </p>
                  </div>
                </Link>
                <div className="proyect-project">
                  <div className="pro">
                    <div className="mis-proyectos">
                      <p> Mis proyectos </p>
                    </div>
                    <div className="icono" onClick={() => onOpen()}  >
                      <LuPlus className="icon" />
                    </div>
                  </div>

                  {arrayProyectos.length === 0 && isLoadingSkeleton
                    ?
                    <div className="progress-projects">
                      <div className="proy">
                        <Spinner color="warning" />
                      </div>
                    </div>
                    :
                    arrayProyectos.length === 0 &&
                    <p className="texto-sin-proyectos"> Sin proyectos creados</p>
                  }

                  {arrayProyectos?.map((proyecto, index) => (
                    <div key={index} style={{ width: '100%' }}>
                      <Link href={`/app/nuevo-proyecto/${proyecto?._id}`}>
                        <div className="array-proyectos">
                          <div className="texto">
                            <span>#</span> <p> {proyecto?.project} </p>
                          </div>
                          <div className="basura" onClick={() => { eliminarProyecto(proyecto?._id); setActualizador() }}>
                            <PiTrashSimple className="icon" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                </div>
              </div>

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1"> Nuevo proyecto </ModalHeader>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Proyecto"
                          placeholder="Nombre del nuevo proyecto"
                          variant="bordered"
                          onChange={(e) => setNombreProyecto(e.target.value)}
                          required
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Cerrar
                        </Button>
                        <Button color="primary" onClick={() => { crearProyecto(); setActualizador() }}>
                          Crear
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <Toaster />

            </motion.div>
          </div>
        </nav>

        <motion.div
          animate={{ x: isMenuOpen ? -100 : 0, opacity: isMenuOpen ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="contenedor-logout">
          <div className="log" onClick={cerrarSesion}>
            <CiLogout className="icon" />
            <p> Cerrar sesion </p>
          </div>
        </motion.div>

      </motion.header>

      {isOpenModalTask &&
        <ModalTaskMobile setIsOpenModalTask={setIsOpenModalTask} />
      }

      {activeModal &&
        <ConfigurationDesktop setActiveModal={setActiveModal} />
      }

    </header>
  )
}

export default Header