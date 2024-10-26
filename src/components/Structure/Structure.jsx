import Configuration from "../Footer/Configuration/Configuration.jsx"
import Footer from "../Footer/Footer.jsx"
import Header from "../Header/Header"
import HeaderMobile from "../Header/HeaderMobile.jsx"
import "./Structure.scss"

const Structure = ({ children }) => {

    return (
        <div className='structure-del-main'>

            <Header />
            <HeaderMobile />

                <main className="contenedor">
                    <div className="desarrollo">
                        {children}
                    </div>
                </main>

            {/* <Footer /> */}

        </div>
    )
}

export default Structure