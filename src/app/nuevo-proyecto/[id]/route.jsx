import mongo from '@/services/MongoDB.jsx';
import Tareas from "@/models/Tasks.jsx";
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
        mongo()
        const { tarea, estado, prioridad, descripcion, client, fechaDeTarea } = await req.json()

        if (!tarea) {
            return NextResponse.json({ error: "El titulo es requerido" }, { status: 400 })
        }

        await Tareas.create({
            tarea,
            estado,
            prioridad,
            descripcion,
            client,
            fechaDeTarea,
            projects: params.id
        })

        return NextResponse.json({
            message: "Tarea agregada exitosamente",
        }, { status: 200 })

    } catch (error) {
        console.log(error)
    }
}

export async function GET({ params }) {
    try {
        mongo()

        const { id } = params

        const tareas = await Tareas.find({ projects: new ObjectId(id) })

        if (!tareas) {
            return NextResponse.json({ error: 'No se encontraron tareas' }, { status: 404 })
        }

        return NextResponse.json({ tareas }, { status: 200 })

    } catch (error) {
        console.log(error)
    }
}