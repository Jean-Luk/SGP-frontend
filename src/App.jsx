import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

import Pedacos from "./pages/Pedacos.jsx";
import Buscar from "./pages/Buscar.jsx";
import Tipos from "./pages/Tipos.jsx";
import Vendedores from "./pages/Vendedores.jsx";
import VisualizarPedaco from "./pages/VisualizarPedaco.jsx";
import RetirarPedaco from "./pages/retirarPedaco.jsx";


export default function App () {

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Buscar />} />
        <Route path="/pedacos" element={<Pedacos />} />
        <Route path="/visualizarPedaco/:id" element={<VisualizarPedaco />} />
        <Route path="/retirarPedaco/:id" element={<RetirarPedaco />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="/vendedores" element={<Vendedores />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}