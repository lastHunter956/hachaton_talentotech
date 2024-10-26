import mongoose from "mongoose";

const projectsSchema = mongoose.Schema({
    project: {
        type: String,
        required: true
    }, 
    client: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clients" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }]
})

export default mongoose.models.Projects || mongoose.model("Projects", projectsSchema);