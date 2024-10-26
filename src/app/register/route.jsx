import { NextResponse } from "next/server";
import Client from "../../models/Client.jsx";
import mongo from "../../services/MongoDB.jsx";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await mongo();
        const { email, password } = await req.json();

        const busquedaCliente = await Client.findOne({ email });
        if (busquedaCliente) {
            return NextResponse.json({ error: "Email ya registrado. Intentá con otro" }, { status: 409 });
        }

        if (email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const lowerCaseEmail = email.toLowerCase();
            await Client.create({
                email: lowerCaseEmail.toLowerCase(),
                password: hashedPassword
            });
            return NextResponse.json({ message: "Cliente registrado exitosamente" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
