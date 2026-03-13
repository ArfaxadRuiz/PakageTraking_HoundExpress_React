import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Guia = {
  id: number;
  numeroGuia: string;
  origen: string;
  destino: string;
  destinatario: string;
  fecha: string;
  estado: string;
  historial: { estado: string; fecha: string }[];
};

interface GuidesState {
  lista: Guia[];
}

const initialState: GuidesState = {
  lista: [],
};


// thunk para obtener guías desde la API
export const fetchGuias = createAsyncThunk('guides/fetchGuias', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/guia/');

  // Convertimos los datos del backend al formato que usa el frontend
  return response.data.map((g: any) => ({
    id: g.id,
    numeroGuia: g.trackingNumber,
    origen: g.origin,
    destino: g.destination,
    destinatario: '',
    fecha: g.createdAt,
    estado: g.currentStatus.toLowerCase(),
    historial: [],
  }));
});

export const crearGuia = createAsyncThunk(
  'guides/crearGuia',
  async (guia: any) => {

    const response = await axios.post(
      'http://127.0.0.1:8000/api/guia/',
      guia
    );

    return response.data;
  }
);

export const actualizarGuia = createAsyncThunk(
  "guides/actualizarGuia",
  async ({ id, currentStatus }: { id: number; currentStatus: string }) => {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/guia/${id}/`,
      { currentStatus }
    );

    return response.data;
  }
);


const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {

    agregarGuia: (state, action: PayloadAction<Guia>) => {
      state.lista.push(action.payload);
    },

    actualizarEstado: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const guia = state.lista[index];
      if (!guia) return;

      let nuevoEstado = guia.estado;

      if (guia.estado === 'pendiente') nuevoEstado = 'en-transito';
      else if (guia.estado === 'en-transito') nuevoEstado = 'entregado';

      if (nuevoEstado !== guia.estado) {
        guia.estado = nuevoEstado;
        guia.historial.push({
          estado: nuevoEstado,
          fecha: new Date().toLocaleString(),
        });
      }
    },
  },

  // recibir datos de la API
  extraReducers: (builder) => {
  builder.addCase(fetchGuias.fulfilled, (state, action) => {
    state.lista = action.payload;
  });

  builder.addCase(crearGuia.fulfilled, (state, action) => {
    const g = action.payload;

    state.lista.push({
      id: g.id,
      numeroGuia: g.trackingNumber,
      origen: g.origin,
      destino: g.destination,
      destinatario: '',
      fecha: g.createdAt,
      estado: g.currentStatus.toLowerCase(),
      historial: [],
    });
  });

  builder.addCase(actualizarGuia.fulfilled, (state, action) => {
  const guiaActualizada = action.payload;

  const index = state.lista.findIndex(
    (g) => g.numeroGuia === guiaActualizada.trackingNumber
  );

  if (index !== -1) {
    state.lista[index].estado = guiaActualizada.currentStatus.toLowerCase();
  }
});

},

});

export const { agregarGuia, actualizarEstado } = guidesSlice.actions;
export default guidesSlice.reducer;