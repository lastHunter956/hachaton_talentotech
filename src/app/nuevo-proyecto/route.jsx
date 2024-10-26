import { NextResponse } from "next/server";
import mongo from "@/services/MongoDB";
import Proyectos from "@/models/Projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions";

export async function POST(req) {
    try {
        await mongo();
        const { proyecto, client } = await req.json();

        if (proyecto) {
            const newProject = await Proyectos.create({
                project: proyecto,
                client: client
            });
            return NextResponse.json(
                { message: "Proyecto creado exitosamente", project: newProject },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                { error: "No se pudo crear el proyecto: falta el campo 'proyecto'" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error al crear el proyecto:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await mongo();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const datos = await Proyectos.find({ client: session?.user?.id });
        if (datos) {
            return NextResponse.json({ datos }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await mongo();

        const { id } = await req.json();

        const deletedProject = await Proyectos.findByIdAndDelete(id);

        if (deletedProject) {
            return NextResponse.json({ message: 'Proyecto eliminado exitosamente' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Proyecto no encontrado' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
