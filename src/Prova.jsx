import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Prova.css";

export default function Prova() {
  const { id } = useParams();
  const [questao, setQuestao] = useState(null);
  const [questaoIndex, setQuestaoIndex] = useState(1);

  async function buscarQuestao() {
    const respostQuestao = await fetch(
      `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`,
    );
    const dadosQuestao = await respostQuestao.json();
    setQuestao(dadosQuestao);
  }

  function avançar() {
    if (questaoIndex === 180) {
      alert("Não é possivel avançar");
    } else {
      setQuestaoIndex(questaoIndex + 1);
    }
  }

  function voltar() {
    if (questaoIndex === 1) {
      alert("Não é possivel voltar");
    } else {
      setQuestaoIndex(questaoIndex - 1);
    }
  }

  function verResposta(questao) {
    alert(`Resposta correta: ${questao.correctAlternative}`);
  }

  useEffect(() => {
    buscarQuestao();
  }, [questaoIndex]);

  return questao ? (
    <div className="prova-container">
      <h1 className="prova-titulo">{questao.title}</h1>

      <div className="prova-conteudo">
        <p className="prova-contexto">{questao.context}</p>
        <p className="prova-introducao">
          <b>{questao.alternativesIntroduction}</b>
        </p>

        <ul className="prova-alternativas" style={{ listStyleType: "upper-alpha" }}>
          {questao.alternativas ?? questao.alternatives.map((alt, i) => {
            return <li key={i}>{alt.text}</li>;
          })}
        </ul>
      </div>

      <div className="prova-acoes">
        <button className="btn btn-voltar" onClick={voltar}>Voltar</button>
        <button className="btn btn-resposta" onClick={() => verResposta(questao)}>Ver resposta</button>
        <button className="btn btn-avancar" onClick={avançar}>Avançar</button>
      </div>
    </div>
  ) : null;
}