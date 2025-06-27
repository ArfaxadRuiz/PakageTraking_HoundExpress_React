import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistroGuia from './RegistroGuia';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('RegistroGuia', () => {
  test('permite registrar una nueva guía', async () => {
    render(
      <Provider store={store}>
        <RegistroGuia />
      </Provider>
    );

    // Simula el llenado del formulario
    await userEvent.type(screen.getByLabelText(/Numero de Guía/i), '12345');
    await userEvent.type(screen.getByLabelText(/origen/i), 'CDMX');
    await userEvent.type(screen.getByLabelText(/destino/i), 'Guadalajara');
    await userEvent.type(screen.getByLabelText(/destinatario/i), 'Juan Pérez');
    await userEvent.type(screen.getByLabelText(/fecha de creacion/i), '2025-06-23');
    await userEvent.selectOptions(screen.getByLabelText(/estado inicial/i), 'pendiente');

    // Haz clic en "Registrar Guía"
    await userEvent.click(screen.getByRole('button', { name: /registrar guía/i }));

    // Verifica que la guía se haya agregado al store
    const state = store.getState().guides.lista;
    const guia = state.find((g) => g.numeroGuia === '12345');

    expect(guia).toBeDefined();
    expect(guia?.origen).toBe('CDMX');
    expect(guia?.destino).toBe('Guadalajara');
    expect(guia?.destinatario).toBe('Juan Pérez');
    expect(guia?.fecha).toBe('2025-06-23');
    expect(guia?.estado).toBe('pendiente');
  });
});