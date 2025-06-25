import React from 'react';
import Header from './components/Header/Header';
import RegistroGuia from './components/RegistroGuia/RegistroGuia';
import EstadoGeneral from './components/EstadoGeneral/EstadoGeneral';
import ListaGuias from './components/ListaGuias/ListaGuias';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <RegistroGuia />
      <EstadoGeneral />
      <ListaGuias />
      <Footer />
    </>
  );
}

export default App;