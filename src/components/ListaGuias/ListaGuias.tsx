import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actualizarEstado, fetchGuias } from '../../store/guidesSlice';
import './ListaGuias.scss';
import axios from "axios";
import { actualizarGuia } from '../../store/guidesSlice';
import { crearEstatus } from '../../store/guidesSlice';


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

  // cargar guías desde la API cuando se monta el componente
  useEffect(() => {
    dispatch(fetchGuias());
  }, [dispatch]);

  const handleActualizar = (index: number) => {

  const guia = guias[index];

  let nuevoEstado = guia.estado;

  if (guia.estado === "pendiente") nuevoEstado = "en-transito";
  else if (guia.estado === "en-transito") nuevoEstado = "entregado";

  const estadoAPI =
    nuevoEstado === "pendiente"
      ? "CREATED"
      : nuevoEstado === "en-transito"
      ? "IN_TRANSIT"
      : "DELIVERED";

  dispatch(
    actualizarGuia({
      id: guia.id,
      currentStatus: estadoAPI,
    })
  );

  dispatch(
    crearEstatus({
      id: Date.now(),
      guideId: guia.id,
      status: estadoAPI,
      updatedBy: "sistema"
    })
  );

  dispatch(actualizarEstado(index));
};



  const verHistorial = async (index: number) => {

  const guia = guias[index];

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/estatus/?guideId=${guia.id}`
      );

      const historial = response.data;

      if (historial.length === 0) {
        alert("No hay historial para esta guía");
        return;
      }

      const historialTexto = historial
        .map((h: any) => `• ${h.status} - ${h.timestamp}`)
        .join("\n");

      alert(`Historial de la guía ${guia.numeroGuia}:\n\n${historialTexto}`);

    } catch (error) {
      console.error("Error obteniendo historial", error);
    }
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
                <td>{formatearEstado(guia.estado)}</td>
                <td>{guia.origen}</td>
                <td>{guia.destino}</td>
                <td>{guia.fecha}</td>

                <td>
                  {guia.estado !== 'entregado' && (
                    <button
                      className="btn-accion"
                      onClick={() => handleActualizar(index)}
                    >
                      Actualizar
                    </button>
                  )}

                  <button
                    className="btn-accion"
                    onClick={() => verHistorial(index)}
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