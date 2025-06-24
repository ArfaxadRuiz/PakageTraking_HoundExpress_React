import React from 'react';
import './EstadoGeneral.scss';

const EstadoGeneral = ({ guias }) => {
  const total = guias.length;
  const transito = guias.filter(g => g.estado === 'en-transito').length;
  const entregadas = guias.filter(g => g.estado === 'entregado').length;

  return (
    <section id="estado" className="estado-general">
      <h2>Estado General del Sistema</h2>
      <ul>
        <li>Total de guías activas: <span>{total}</span></li>
        <li>Guías en tránsito: <span>{transito}</span></li>
        <li>Guías entregadas: <span>{entregadas}</span></li>
      </ul>
    </section>
  );
};

export default EstadoGeneral;