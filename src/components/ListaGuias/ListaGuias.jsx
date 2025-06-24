import React from 'react';
import './ListaGuias.scss';

const ListaGuias = ({ guias, onActualizarEstado, onVerHistorial }) => {
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
                      <button
                        className="btn-accion"
                        onClick={() => onActualizarEstado(index)}
                      >
                        Actualizar
                      </button>
                    )}
                    <button
                      className="btn-accion"
                      onClick={() => onVerHistorial(index)}
                    >
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