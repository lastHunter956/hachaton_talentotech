'use client'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Hola = () => {
   const { data: session, status } = useSession()

  return (
    <div>
      <button onClick={() => signOut()} className='bg-red-500'> Cerrar sesion </button>
      <h1> Acceso concedido </h1>

      <p className='text-red-500'> Estado: {status} </p>

    </div>
  )
}

export default Hola;