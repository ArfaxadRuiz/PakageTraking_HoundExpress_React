import React, { useState } from 'react';
import Header from './components/Header/Header';
import RegistroGuia from './components/RegistroGuia/RegistroGuia';
import EstadoGeneral from './components/EstadoGeneral/EstadoGeneral';
import ListaGuias from './components/ListaGuias/ListaGuias';
import Footer from './components/Footer/Footer';

function App() {
  const [guias, setGuias] = useState([]);

  const registrarGuia = (nuevaGuia) => {
    setGuias([...guias, nuevaGuia]);
  };

  const actualizarEstado = (index) => {
    setGuias((prevGuias) =>
      prevGuias.map((guia, i) => {
        if (i !== index) return guia;

        let nuevoEstado = guia.estado;
        if (guia.estado === 'pendiente') nuevoEstado = 'en-transito';
        else if (guia.estado === 'en-transito') nuevoEstado = 'entregado';
        // Si ya está entregado, no cambia
        if (nuevoEstado === guia.estado) return guia;

        const nuevaEntradaHistorial= {
          estado: nuevoEstado,
          fecha: new Date().toLocaleString(),
        };

        return { 
          ...guia, 
          estado: nuevoEstado,
          historial: [...guia.historial, nuevaEntradaHistorial], 
        };
      })
    );
  };

  const verHistorial = (index) => {
    const guia = guias[index];
    const historialTexto = guia.historial
      .map((h) => `• ${formatearEstado(h.estado)} - ${h.fecha}`)
      .join('\n');

    alert(`Historial de la guía ${guia.numeroGuia}:\n\n${historialTexto}`);
  };

  const formatearEstado = (estado) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'en-transito': return 'En tránsito';
      case 'entregado': return 'Entregado';
      default: return estado;
    }
  };

  return (
    <>
      <Header />
      <RegistroGuia onRegistrar={registrarGuia}/>
      <EstadoGeneral guias={guias} />
      <ListaGuias 
        guias={guias} 
        onActualizarEstado={actualizarEstado}
        onVerHistorial={verHistorial} 
      />
      <Footer />
    </>
  )
}

export default App