import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions"; 
import "./Style.scss";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa6";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/app/hoy");
  }

  return (
    <div className="home">
      <div className="contenedor-de-home">
        <header className="header-home">
          <div className="titulo-de-titulo">
            <Link href="/">
              <h1>To Do List</h1>
            </Link>
          </div>

          <div className="botones-acceso">
            <Link href="/auth/login" className="boton-inicio">
              Acceder
            </Link>

            <Link href="/auth/register" className="boton-inicio">
              Registrarse
            </Link>
          </div>
        </header>

        <main className="contenido-de-home">
          <div className="titulo">
            <h2 className="texto-titulo">Incrementá tu productividad</h2>
          </div>
          <div className="introduccion">
            <p className="texto-introduccion">
              Organizá y gestioná tus tareas de forma eficiente. Marca las
              completadas, cancela las innecesarias y deja pendientes las que
              requieren más tiempo. Agrupalas en secciones personalizadas,
              asigná fechas específicas y mantené un control claro de tus
              prioridades.
            </p>
          </div>
          <div className="imagen-del-proyecto">
            <Image
              src="/img/to-do-list-captura.png"
              width={1050}
              height={600}
              className="imagen-proyecto"
              alt="Captura del proyecto"
            />
            <Image
              src="/img/captura-dos.png"
              width={400}
              height={100}
              className="i-p-mobile"
              alt="Captura del proyecto"
            />
          </div>
        </main>

        <footer className="footer-home">
          <div className="contenedor-footer-home">
            <div className="iconos">
              <div className="iconic">
                <a href="https://github.com/Lucascabral95" target="_blank">
                  <FaGithub className="icon-footer" />
                </a>
              </div>
              <div className="iconic">
                <a href="https://github.com/Lucas-Cabral" target="_blank">
                  <FaFacebook className="icon-footer" />
                </a>
              </div>
              <div className="iconic">
                <a href="https://instagream.com/lucascabral195" target="_blank">
                  <FaInstagram className="icon-footer" />
                </a>
              </div>
            </div>
            <div className="texto-mio">
              <p className="texto-mio-texto">
                Powered and designed by Lucas Cabral 🚀🚀🚀
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
