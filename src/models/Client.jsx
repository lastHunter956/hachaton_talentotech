import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.models.Clients || mongoose.model("Clients", clientSchema)