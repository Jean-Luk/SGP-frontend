import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Pedacos from "./pages/Pedacos.jsx";
import VisualizarPedaco from "./pages/VisualizarPedaco.jsx";
import { StrictMode } from 'react'

export default function App () {

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Pedacos />} />
        <Route path="/pedacos" element={<Pedacos />} />
        <Route path="/visualizarPedaco/:id" element={<VisualizarPedaco />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}