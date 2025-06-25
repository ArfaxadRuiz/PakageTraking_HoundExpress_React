import React from 'react';
import { useAppSelector } from '../../store/hooks';
import './EstadoGeneral.scss';

const EstadoGeneral = () => {
  const guias = useAppSelector((state) => state.guides.lista);

  const total = guias.length;
  const transito = guias.filter(g => g.estado === 'en-transito').length;
  const entregadas = guias.filter(g => g.estado === 'entregado').length;

  return (
    <section id="estado" className="estado-general">
      <h2>Estado General del Sistema</h2>
      <ul>
        <li>Total de guías activas: <span id="total-guias">{total}</span></li>
        <li>Guías en tránsito: <span id="guias-transito">{transito}</span></li>
        <li>Guías entregadas: <span id="guias-entregadas">{entregadas}</span></li>
      </ul>
    </section>
  );
};

export default EstadoGeneral;