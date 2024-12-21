import { useState } from 'react'
import axios from 'axios'
import { CgArrowLongRight } from 'react-icons/cg'
import { FaLinkedin } from 'react-icons/fa6'
import { FaGithub } from 'react-icons/fa'

import './App.css'
import './App-responsive.css'

function App() {
  const [moedas] = useState(['USD', 'BRL', 'EUR', 'CAD', 'GBP', 'ARS'])
  const [valor, setValor] = useState()
  const [deMoeda, setDeMoeda] = useState('USD')
  const [paraMoeda, setParaMoeda] = useState('BRL')
  const [taxaConversao, setTaxaConversao] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0)
  const [erro, setErro] = useState(null)

  const buscarConversao = async () => {
    try {
      const response = await axios.get(
        `https://economia.awesomeapi.com.br/json/last/${deMoeda}-${paraMoeda}`,
      )

      // const data = response.data
      const chave = `${deMoeda}${paraMoeda}`
      const taxa = response.data[chave]?.ask

      if (!taxa) {
        return setErro('Taxa de conversão não encontrada')
      }

      const valorConvertido = parseFloat(valor) * parseFloat(taxa)

      setValorConvertido(valorConvertido)
      setTaxaConversao(taxa)
      setErro(null)
    } catch (erro) {
      setErro(
        erro.response
          ? erro.response.data.erro
          : 'Erro ao buscar taxas de câmbio',
      )
    }
  }

  return (
    <div className="App">
      <div className="interface-conversor">
        <div className="conteudo">
          <div className="titulo">
            <img src="imagens/icone.webp" />
            <h2>Conversor de Moedas</h2>
          </div>

          <div className="texto-escolha-moedas">
            <p>Escolha as moedas:</p>
          </div>

          <div className="conteudo-select">
            <div className="select-de">
              {/* <label>De:</label> */}
              <select
                value={deMoeda}
                onChange={(evento) => setDeMoeda(evento.target.value)}
              >
                {moedas.map((moeda) => (
                  <option key={moeda} value={moeda}>
                    {moeda}
                  </option>
                ))}
              </select>
            </div>

            <div className="seta">
              <CgArrowLongRight />
            </div>

            <div className="select-para">
              {/* <label>Para:</label> */}
              <select
                value={paraMoeda}
                onChange={(evento) => setParaMoeda(evento.target.value)}
              >
                {moedas.map((moeda) => (
                  <option key={moeda} value={moeda}>
                    {moeda}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="texto-digite-valor">
            <p>Qual o valor:</p>
          </div>

          <div className="conteudo-input">
            <input
              placeholder="Digite o valor"
              type="number"
              value={valor}
              onChange={(evento) => setValor(evento.target.value)}
            />
          </div>

          <div className="container-botao-e-resultado">
            <div className="container-botao">
              <button onClick={buscarConversao}>Converter</button>
            </div>

            <div className="texto-resultado">
              <p>Resultado:</p>
            </div>
            <div className="valor-convertido">
              <p>
                {isNaN(valorConvertido)
                  ? 'Valor inválido'
                  : valorConvertido.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="desenvolvedor">
          <p>Desenvolvido por Daniel Formoso.</p>
          <div className="redes">
            <a
              href="https://www.linkedin.com/in/danielformoso/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
            <a href="https://github.com/Daniel-Formoso" target="_blank">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
