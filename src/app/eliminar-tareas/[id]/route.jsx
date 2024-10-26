import mongo from "@/services/MongoDB.jsx"
import Tasks from "@/models/Tasks.jsx"
import { NextResponse } from "next/server"

export async function DELETE(req, { params }) {
    try {
        await mongo();
        const { id } = await params;

        const deletedTask = await Tasks.findByIdAndDelete({ _id: id });

        if (deletedTask) {
            return NextResponse.json({ message: 'Tarea eliminada exitosamente' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'No se pudo eliminar la tarea' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await mongo();
        const { id } = await params;

        const updateTask = await Tasks.findByIdAndUpdate({ _id: id },
            { $set: { estado: "Terminada" } },
        );

        if (updateTask) {
            return NextResponse.json({ message: 'Tarea actualizada exitosamente' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'No se pudo actualizar la tarea' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}