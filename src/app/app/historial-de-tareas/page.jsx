import "./historial.scss"
import Structure from "@/components/Structure/Structure"
import Tablee from "@/components/Table/Table";

const HistorialDeTareas = () => {

    return (
        <Structure>
            <section className="historial-de-tareas">
                <div className="titulo">
                    <h2> Historial de tareas </h2>
                </div>

                <Tablee />

            </section>
        </Structure>
    )
}

export default HistorialDeTareas