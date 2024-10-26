import "./Footer.scss"
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-definitivo">
      <div className="contenedor">

        <div className="texto">
          <p> Powered and designed by Lucas Cabral ❤ </p>
        </div>

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

      </div>
    </footer>
  )
}

export default Footer