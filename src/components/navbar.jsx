import { Link } from "react-router-dom";

const LinkButton = (prop) => {
  return (
    <Link to={"/" + prop.href} className="hover:underline">{prop.title}</Link>
  )
}
export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 space-x-4 flex gap-4 justify-center">
      <LinkButton href="" title="Buscar"/>
      <LinkButton href="pedacos" title="Novo pedaço"/>
      <LinkButton href="tipos" title="Tipos"/>
      <LinkButton href="vendedores" title="Vendedores"/>
    </nav>
  );
}
