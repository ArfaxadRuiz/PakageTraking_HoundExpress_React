import guidesReducer, {
  agregarGuia,
  actualizarEstado,
  Guia,
} from './guidesSlice';

describe('guidesSlice Reducer', () => {
  const guiaBase: Omit<Guia, 'historial'> = {
    numeroGuia: 'ABC123',
    origen: 'CDMX',
    destino: 'Guadalajara',
    destinatario: 'Juan Pérez',
    fecha: '2025-06-27',
    estado: 'pendiente',
  };

  test('agregarGuia debería añadir una guía al estado', () => {
    const initialState = { lista: [] };

    const nuevaGuia: Guia = {
      ...guiaBase,
      historial: [
        { estado: 'pendiente', fecha: '2025-06-27 10:00' }
      ]
    };

    const stateFinal = guidesReducer(initialState, agregarGuia(nuevaGuia));

    expect(stateFinal.lista.length).toBe(1);
    expect(stateFinal.lista[0].numeroGuia).toBe('ABC123');
    expect(stateFinal.lista[0].estado).toBe('pendiente');
  });

  test('actualizarEstado debería avanzar al siguiente estado', () => {
    const initialState = {
      lista: [
        {
          ...guiaBase,
          historial: [{ estado: 'pendiente', fecha: '2025-06-27 10:00' }]
        }
      ]
    };

    // Primera transición: pendiente → en-transito
    let nuevoEstado = guidesReducer(initialState, actualizarEstado(0));
    expect(nuevoEstado.lista[0].estado).toBe('en-transito');
    expect(nuevoEstado.lista[0].historial.length).toBe(2);

    // Segunda transición: en-transito → entregado
    nuevoEstado = guidesReducer(nuevoEstado, actualizarEstado(0));
    expect(nuevoEstado.lista[0].estado).toBe('entregado');
    expect(nuevoEstado.lista[0].historial.length).toBe(3);

    // Tercer intento: entregado → sin cambio
    const sinCambio = guidesReducer(nuevoEstado, actualizarEstado(0));
    expect(sinCambio.lista[0].estado).toBe('entregado'); // no avanza
    expect(sinCambio.lista[0].historial.length).toBe(3); // historial no cambia
  });
});