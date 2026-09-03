import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

export default function Prova() {

    const { id } = useParams()
    const [questao, setQuestao] = useState(null)
    const [questaoIndex, setQuestaoIndex] = useState(1)

    async function buscarQuestao() {
        const respostQuestao = await fetch (
            `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`
        )
        const dadosQuestao = await respostQuestao.json()
        setQuestao(dadosQuestao)
    }
    
    function avançar() {
        if(questaoIndex === 180) {
            alert('Não é possivel avançar')
        } else {
            setQuestaoIndex(questaoIndex + 1)
        }
    }

    function voltar() {
        if(questaoIndex === 1) {
            alert('Não é possivel voltar')
        } else {
            setQuestaoIndex(questaoIndex - 1)
        }
    }

    function verResposta(questao) {
        alert(`Resposta correta: ${questao.correctAlternative}`)
    }

    useEffect(() => {
        buscarQuestao()
    }, [questaoIndex])

    return (
        questao ? <div>
            <h1>{questao.title}</h1>
            <p>{questao.context}</p>
            <p>
                <b>
                    {questao.alternativesIntroduction}
                </b>
            </p>

            <ul style={{ listStyleType: 'upper-alpha' }}>
                {questao.alternatives.map((alt, i) => {
                    return(
                        <li key={i}>
                            {alt.text}
                        </li>
                    )
                })}
            </ul>

            <button onClick={() => verResposta(questao)}>
                Ver resposta
            </button>

            <button onClick={avançar}>
                Avançar
            </button>
            
            <button onClick={voltar}>
                Voltar
            </button>
            
        </div> : null
    )
}