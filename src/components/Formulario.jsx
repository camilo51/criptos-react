import { useEffect, useState } from "react";
import styled from "styled-components";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 4px;
  transition: background-color ease 0.3s;
  margin-top: 30px;

  &:hover {
    background-color: #7a7bfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elije tu Moneda!", monedas);
  const [criptomoneda, SelectCriptomonedas] = useSelectMonedas(
    "Elije tu Criptomoneda!",
    criptos
  );
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return objeto;
      });

      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    console.log(moneda);
    console.log(criptomoneda);
    setMonedas({ moneda, criptomoneda });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handlesubmit}>
        <SelectMonedas />
        <SelectCriptomonedas />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};
export default Formulario;
