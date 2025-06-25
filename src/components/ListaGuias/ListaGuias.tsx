import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actualizarEstado } from '../../store/guidesSlice';
import './ListaGuias.scss';

const formatearEstado = (estado: string) => {
  switch (estado) {
    case 'pendiente': return 'Pendiente';
    case 'en-transito': return 'En tránsito';
    case 'entregado': return 'Entregado';
    default: return estado;
  }
};

const ListaGuias = () => {
  const dispatch = useAppDispatch();
  const guias = useAppSelector((state) => state.guides.lista);

  const handleActualizar = (index: number) => {
    dispatch(actualizarEstado(index));
  };

  const verHistorial = (index: number) => {
    const guia = guias[index];
    const historialTexto = guia.historial
      .map((h) => `• ${formatearEstado(h.estado)} - ${h.fecha}`)
      .join('\n');
    alert(`Historial de la guía ${guia.numeroGuia}:\n\n${historialTexto}`);
  };

  return (
    <section id="lista" className="lista-guias">
      <h2>Lista de Guías</h2>
      {guias.length === 0 ? (
        <p>No hay guías registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número de Guía</th>
              <th>Estado</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {guias.map((guia, index) => (
              <tr key={index}>
                <td>{guia.numeroGuia}</td>
                <td>{guia.estado}</td>
                <td>{guia.origen}</td>
                <td>{guia.destino}</td>
                <td>{guia.fecha}</td>
                <td>
                  {guia.estado !== 'entregado' && (
                    <button className="btn-accion" onClick={() => handleActualizar(index)}>
                      Actualizar
                    </button>
                  )}
                  <button className="btn-accion" onClick={() => verHistorial(index)}>
                    Ver Historial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ListaGuias;