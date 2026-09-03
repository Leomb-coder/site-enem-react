import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function App() {
  const [provas, setProvas] = useState([]);

  async function buscarProvas() {
    const respostaProvas = await fetch("https://api.enem.dev/v1/exams");
    const dadosProvas = await respostaProvas.json();
    setProvas(dadosProvas);
  }

  useEffect(() => {
    buscarProvas();
  }, []);

  return (
    <div>
      <h1>App Enem</h1>

      {provas.map((prova, i) => {
        return (
          <div key={i}>
            <h2>{prova.title}</h2>
            <Link to={`prova/${prova.year}`}>Acessar</Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
