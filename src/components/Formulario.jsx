import styled from '@emotion/styled'
import {useSelectMonedas} from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { useEffect, useState } from 'react'
import { Error } from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 900;
    font-size: 20px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-top: 30px;
    transition: all .3s ease;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [moneda, SelectMonedas] = useSelectMonedas('Elije tu moneda', monedas);
    const [criptoMoneda, SelectCripoMonedas] = useSelectMonedas('Elije tu Criptomoneda', criptos);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto;
            })

            setCriptos(arrayCriptos);

        }   

        consultarAPI();
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault();

        if ([moneda, criptoMoneda].includes('')) {
            setError(true);

            return;
        }

        setError(false);
        setMonedas({
            moneda,
            criptoMoneda
        })
    }

    return (
        <>
        {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas></SelectMonedas>
                <SelectCripoMonedas></SelectCripoMonedas>
                <InputSubmit type="submit" value="Cotizar"/>
            </form>
        </>
    )
}
