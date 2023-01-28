import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import { Formulario } from './components/Formulario'
import { Cotizacion } from './components/Cotizacion'
import { Spinner } from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({}); // STATE DE LOS OPTIONS SELECCIONADOS
  const [cotizacion, setCotizacion] = useState({}); // STATE PARA LLENAR EL OBJETO CON LA INFO
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      setCargando(true);
      
      const cotizarCripto = async () => {
        
        setCotizacion({});

        const {moneda, criptoMoneda} = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCotizacion(resultado.DISPLAY[criptoMoneda][moneda]);
        setCargando(false);
      }

      setTimeout(() => {
        cotizarCripto();
      }, 1000);
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen src={imagenCripto} alt='imagenes criptomonedas'></Imagen>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas}></Formulario>
        {cargando && <Spinner></Spinner>}
        {cotizacion.PRICE && <Cotizacion cotizacion={cotizacion}></Cotizacion>}
      </div>
    </Contenedor>
  )
}

export default App
