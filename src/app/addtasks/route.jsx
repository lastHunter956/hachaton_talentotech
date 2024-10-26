import { NextResponse } from "next/server";
import Tasks from "@/models/Tasks.jsx";
import mongo from "@/services/MongoDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions.jsx";

export async function POST(req) {
    await mongo();

    try {
        const { tarea, estado, prioridad, descripcion, client, fechaDeTarea, projects } = await req.json();

        if (!tarea) {
            return NextResponse.json({ error: "El titulo es requerido" }, { status: 400 });
        }

        await Tasks.create({
            tarea,
            estado,
            prioridad,
            descripcion,
            client,
            fechaDeTarea,
            projects
        });

        return NextResponse.json({
            message: "Tarea agregada exitosamente",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    await mongo();
    const session = await getServerSession(authOptions);

    try {
        let tasks = ""
        if (session?.user?.id) {
            tasks = await Tasks.find({ client: session?.user?.id });
        } else {
            tasks = await Tasks.find({ email: session?.user?.email });
        }
        const populate = await Tasks.find({}).populate("client");
        return NextResponse.json({
            tasks,
            populate,
            session
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}