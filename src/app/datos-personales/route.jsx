import { NextResponse } from "next/server";
import mongo from "@/services/MongoDB";
import Usuarios from "@/models/Usuarios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions.jsx";

export async function POST(req) {
    const IDSession = await getServerSession(authOptions);
    await mongo();

    const { name, lastName, years, telefono, localidad, provincia, calle, codigoPostal } = await req.json();

    const existeIDUsuario = await Usuarios.findOne({ client: IDSession?.user?.id });
    if (existeIDUsuario) {
        await Usuarios.findOneAndUpdate({ client: IDSession?.user?.id }, {
            name,
            lastName,
            years,
            telefono,
            localidad,
            provincia,
            calle,
            codigoPostal
        });
        return NextResponse.json({ message: "Datos del usuario actualizados exitosamente" }, { status: 200 });
    } else {
        const usuario = new Usuarios({
            name,
            lastName,
            years,
            telefono,
            localidad,
            provincia,
            calle,
            codigoPostal,
            client: IDSession?.user?.id
        });

        await usuario.save();
        return NextResponse.json({ message: "Usuario creado exitosamente" }, { status: 200 });
    }
}

export async function GET(req) {
    await mongo();

    const IDSession = await getServerSession(authOptions);
    const existeIDUsuario = await Usuarios.findOne({ client: IDSession?.user?.id });

    if (existeIDUsuario) {
        return NextResponse.json(existeIDUsuario, { status: 200 });
    } else {
        return NextResponse.json({ message: "No existen datos de usuario" }, { status: 404 });
    }
}
