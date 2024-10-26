import Structure from '@/components/Structure/Structure'
import Link from 'next/link'
import "./Style.scss"
import Image from 'next/image'

const NotFound = () => {
    return (
        <Structure>
            <div className="not-found">
                <div className="contenedor">

                    <div className="imagen">
                        <Image src="/img/not-found.jpg" width={400} height={400} alt="Error 404" />
                    </div>

                    <div className="titulo">
                        <h2 className='tit'> Error 404 </h2>
                        <p className="subtitulo"> La página solicitada no existe </p>
                    </div>

                    <div className="boton-redireccion">
                        <div className="boton">
                            <Link href='/app/hoy' className='boton-inicio'> Volver al inicio </Link>
                        </div>
                    </div>

                </div>
            </div>
        </Structure>
    )
}

export default NotFound