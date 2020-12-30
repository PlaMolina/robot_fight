import logo from './logo.svg';
import './App.css';
import Listado from './Listado';
import { useEffect, useState } from 'react';
import Controller from './RobotsController';
import Batalla from './Batalla';
import { Container } from 'reactstrap';

function App() {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    Controller.getAll()
      .then(data => setRobots(data))
      .catch(err => console.log(err))
  }, []);

  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [bandera, setBandera] = useState(false);
  const eligeme = (id, nombre) => {

    jugador1 === "" ? setJugador1(id) : setJugador2(id);
    url1 === "" ? setUrl1(nombre) : setUrl2(nombre);
    if(jugador1 !== "") setBandera(true);




  }

  return (
    <Container  >
      {bandera === false ? <Listado listadoRobots={robots} choseme={eligeme} /> : <Batalla style={{height:"100%"}} nombre1={url1} nombre2={url2} id1={jugador1} id2={jugador2} />}
    </Container>
  );
}

export default App;
