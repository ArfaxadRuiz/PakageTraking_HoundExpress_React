import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Guia = {
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
    numeroGuia: g.trackingNumber,
    origen: g.origin,
    destino: g.destination,
    destinatario: '',
    fecha: g.createdAt,
    estado: g.currentStatus.toLowerCase(),
    historial: [],
  }));
});


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
  },
});

export const { agregarGuia, actualizarEstado } = guidesSlice.actions;
export default guidesSlice.reducer;