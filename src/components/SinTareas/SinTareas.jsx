import "./SinTareas.scss"
import SkeletonEstructura from "../Skeleton/Skeleton.jsx"
import Image from "next/image"

const SinTareas = ({ isEmptyTask, datos, titulo, subtitulo }) => {
  return (
    <>

      {isEmptyTask ? (
        <div className="contenedor-imagen-consejo">
          <div className="imagen">
            <Image src="/img/empty-task-uno.webp" width={150} height={150} alt="Sin tarea(s) diaria(s)" />
          </div>
          <div className="consejos">
            <div className="consejos-texto">
              <p> {titulo} </p>
              <span> {subtitulo} </span>
            </div>
          </div>
        </div>
      ) : (
        datos.length === 0 && !isEmptyTask && <SkeletonEstructura />
      )}

    </>
  )
}

export default SinTareas