import React, { useState } from 'react';
import './RegistroGuia.scss';

const RegistroGuia = ({ onRegistrar }) => {
    const [formulario, setFormulario] = useState({
        numeroGuia: '',
        origen: '',
        destino: '',
        destinatario: '',
        fecha: '',
        estado: 'pendiente',
    });

    const handleChange = (e) =>{
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //aqui se trabaja con la guia
        console.log( 'Guía registrada: ',formulario);

        const nuevaGuia = {
            ...formulario,
            historial: [
                {
                    estado: formulario.estado,
                    fecha: new Date().toLocaleString(),
                },
            ],
        };

        onRegistrar(nuevaGuia);
        //Limpiar formulario
        setFormulario({
            numeroGuia: '',
            origen: '',
            destino: '',
            destinatario: '',
            fecha: '',
            estado: 'pendiente',
        })
    }

    return(
        <section id="registro" className="registro-container">
            <h2>Registro de Guías</h2>
            <form onSubmit={handleSubmit} className="registro-form">
                <label htmlFor="numero-guia">
                    Numero de Guía :
                    <input
                        type="text"
                        id="numero-guia"
                        name="numeroGuia"
                        value={formulario.numeroGuia}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="origen">
                    Origen:
                    <input
                        type="text"
                        id="origen"
                        name="origen"
                        value={formulario.origen}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="destino">
                    Destino:
                    <input
                        type="text"
                        id="destino"
                        name="destino"
                        value={formulario.destino}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="destinatario">
                    Destinatario:
                    <input
                        type="text"
                        id="destinatario"
                        name="destinatario"
                        value={formulario.destinatario}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="fecha">
                    Fecha de Creacion:
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formulario.fecha}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="estado">Estado Inicial:
                    <select
                        id="estado"
                        name="estado"
                        value={formulario.estado}
                        onChange={handleChange}
                        required
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en-transito">En Transito</option>
                        <option value="entregado">Entregado</option>
                    </select>
                </label>
                <button type="submit">Registrar Guía</button>
            </form>
        </section>
    );
}

export default RegistroGuia;