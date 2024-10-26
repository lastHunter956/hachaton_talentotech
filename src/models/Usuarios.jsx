import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    name: {
        type: String
    }, 
    lastName: {
        type: String
    }, 
    years: {
        type: Number
    },
    telefono: {
        type: Number
    },
    localidad : {
        type: String
    }, 
    codigoPostal: {
        type: Number
    },
    provincia: {
        type: String
    }, 
    calle: {
        type: String
    },
    client: [{type: mongoose.Schema.Types.ObjectId, ref: "Clients" }]
})

export default mongoose.models.Usuarios || mongoose.model("Usuarios", UsuarioSchema)