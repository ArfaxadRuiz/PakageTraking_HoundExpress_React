import React from "react";
import logo from '../../assets/logo.png';
import bannerImage from '../../assets/banner-image.jpg';
import './Header.scss';

const Header = () => {
    return(
        <header>
            <section className="top-header">
                <img src={logo} alt="Logo de Hound Express" className="logo" />
                <h1>Hound Express</h1>
                <nav>
                    <ul className="nav-menu">
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#registro">Registro de Guías</a></li>
                        <li><a href="#estado">Estado General</a></li>
                        <li><a href="#lista">Lista de Guías</a></li>
                    </ul>
                </nav>
            </section>

            <section className="banner">
                <div className="banner-content">
                    <h2>¡Entregamos confianza, rastreamos tu progreso!</h2>
                    <p>Tu paquete siempre bajo control con Hound Express.</p>
                    <img src={bannerImage} alt="Imagen de entrega de paquetes" className="banner-image"/>
                </div>
            </section>
        </header>
    );
};

export default Header;
