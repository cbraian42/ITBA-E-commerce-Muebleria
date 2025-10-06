import React from 'react';
import logo from '../img/logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contenedor">
        {/* Identidad */}
        <div className="footer-identidad">
          <img src={logo} alt="Logo Hermanos Jota" id="imglogo" />
          <p>
            "Redescubrimos el arte de crear muebles que no solo cumplen una función,
            sino que alimentan el alma. Una fusión entre herencia e innovación."
          </p>
        </div>

        {/* Programa */}
        <div className="footer-programa">
          <h3>Programa "Herencia Viva"</h3>
          <ul>
            <li>✅ Garantía extendida: 10 años estructura / 5 años acabados</li>
            <li>🔨 Servicio de restauración</li>
            <li>📚 Taller de cuidados gratuito</li>
            <li>♻️ Recompra garantizada: hasta 40%</li>
            <li>📜 Certificado de trazabilidad</li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-contacto">
          <h3>Contacto</h3>
          <p>📍 Av. San Juan 2847, Barrio de San Cristóbal<br />CABA — Argentina</p>
          <p>🕒 Lunes a Viernes: 10-19 hs<br />Sábados: 10-14 hs</p>
          <p>📞 WhatsApp: +54 11 4567-8900</p>
          <p>
            ✉️ General: <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a><br />
            Ventas: <a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a>
          </p>
        </div>

        {/* Redes */}
        <div className="footer-redes">
          <h3>Seguinos</h3>
          <ul>
            <li><a href="./index.html">🌐 www.hermanosjota.com.ar</a></li>
            <li>
              <a
                href="https://alt-5a31a0302d72d.blackboard.com/bbcswebdav/pid-982156-dt-content-rid-14612411_1/courses/FSD.00-43441/Instagram%20copy/index.html?one_hash=C68F76D1CA0ED870091CA04FC7CD5F52&f_hash=1FD84E76D99154E6BF5C64D61DB3C9E6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram 📸: @hermanosjota_ba
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="footer-copy">
        <p>&copy; 2025 Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
