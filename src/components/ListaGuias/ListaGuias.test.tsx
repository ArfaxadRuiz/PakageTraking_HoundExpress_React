import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListaGuias from './ListaGuias';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import guidesReducer, { Guia } from '../../store/guidesSlice';

// Crea una guía de ejemplo
const guiaEjemplo: Guia = {
  numeroGuia: 'ABC123',
  origen: 'CDMX',
  destino: 'Guadalajara',
  destinatario: 'Juan Pérez',
  fecha: '2025-06-27',
  estado: 'pendiente',
  historial: [{ estado: 'pendiente', fecha: '2025-06-27 10:00' }],
};

describe('ListaGuias - Actualización de Estados', () => {
  test('debe actualizar el estado de una guía en el orden correcto', async () => {
    // Crea un store de prueba con una guía pendiente
    const store = configureStore({
      reducer: { guides: guidesReducer },
      preloadedState: {
        guides: {
          lista: [guiaEjemplo],
        },
      },
    });

    render(
      <Provider store={store}>
        <ListaGuias />
      </Provider>
    );

    // Primera actualización: pendiente → en-transito
    const btnActualizar = screen.getByRole('button', { name: /actualizar/i });
    await userEvent.click(btnActualizar);

    let guiaActualizada = store.getState().guides.lista[0];
    expect(guiaActualizada.estado).toBe('en-transito');

    // Segunda actualización: en-transito → entregado
    await userEvent.click(screen.getByRole('button', { name: /actualizar/i }));
    guiaActualizada = store.getState().guides.lista[0];
    expect(guiaActualizada.estado).toBe('entregado');

    // Tercera actualización: no debe cambiar (ya está entregado)
    const btnsActualizar = screen.queryAllByRole('button', { name: /actualizar/i });
    expect(btnsActualizar.length).toBe(0); // Ya no hay botón de actualizar
  });
});