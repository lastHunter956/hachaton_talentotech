"use client"
import "./login.scss"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logueoCredentials = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    });

    if (result.error) {
      setError("Email o contraseña incorrectos");
    } else {
      window.location.href = '/app/hoy';
    }
  };

  const logueoGoogle = () => {
    signIn('google', {
      callbackUrl: `${process.env.NEXTAUTH_URL}`
    });
  }

  return (
    <section className="login-definitivo">
      <div className="contenedor">
        <div className="titulo">
          <h2> Acceso </h2>
        </div>
        <form onSubmit={logueoCredentials}>
          <div className="entrada-logueo">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
             type="email" name="email" id="email" placeholder="Lucas@hotmail.com" required />
          </div>
          <div className="entrada-logueo">
            <label htmlFor="password">Contraseña</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} 
            type="password" name="password" id="password" placeholder="******" required />
          </div>

          <div className="contenedor-error">
            {error && <p className="mensaje-de-error">{error}</p>}
          </div>

          <div className="olvidaste-password">
            <div className="texto">
              <p> ¿Olvidaste tu contraseña? </p>
            </div>
          </div>
          <div className="boton-login">
            <div className="boton" onClick={logueoCredentials}>
              <button type="submit"> Acceso </button>
            </div>
          </div>
        </form>
        <div className="logueo-alternativo">
          <p> O registrate usando </p>
        </div>
        <div className="icono-logueo-alternativo">
          <div className="icono" onClick={logueoGoogle}>
            <FcGoogle className="icon" />
          </div>
        </div>
        <div className="o-registrate">
          <p className="o"> Si no estás registrado, hacelo acá </p>
          <Link href="/auth/register">
            <p className="registrate"> Registrate  </p>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Login;
