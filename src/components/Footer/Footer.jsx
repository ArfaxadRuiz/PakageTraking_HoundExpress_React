import React from 'react';
import './Footer.scss';
import facebookIcon from '../../assets/facebook-icon.png';
import twitterIcon from '../../assets/twitter-icon.png';

const Footer = () => {
  return (
    <footer>
      <section className="footer-content">
        <p>&copy; 2025 Hound Express. Todos los derechos reservados.</p>

        <div className="footer-links">
          <a href="mailto:contacto@houndexpress.com">Contacto</a>
          <a href="#privacidad">Política de Privacidad</a>
        </div>

        <div className="social-media">
          <a
            href="https://www.facebook.com/houndexpress"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a
            href="https://www.twitter.com/houndexpress"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <img src={twitterIcon} alt="Twitter" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;