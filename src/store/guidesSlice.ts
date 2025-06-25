import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { agregarGuia, actualizarEstado } = guidesSlice.actions;
export default guidesSlice.reducer;