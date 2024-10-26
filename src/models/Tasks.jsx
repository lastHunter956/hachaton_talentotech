import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
    tarea: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: false
    },
    fechaDeTarea: {
        type: Date,
        default: Date.now
    },
    descripcion: {
        type: String,
        default: "soy una descripcion"
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    prioridad: String,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
    client: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clients" }]
})

export default mongoose.models.Tasks || mongoose.model("Tasks", tasksSchema);