import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'reactstrap';
import Controller from './RobotsController';
import Rayo from "./rayo.gif";

const Batalla = (props) => {
    const [ganador, setGanador] = useState("");
    const [nombre, setNombre] = useState("");
    const [bandera, setBandera] = useState(false);

    useEffect(() => {
        Controller.getById(ganador)
            .then(data => setNombre(data.nombre))
            .catch(err => console.log(err))
    }, [ganador])
    const lucha = () => {
        Controller.readyForTheBattle(props.id1, props.id2)
            .then(data => setGanador(data.ganador_id))
            .catch(err => console.log(err))

        setBandera(true);
    }

    return (
        <Container fluid style={{ backgroundImage: "url(https://png.pngtree.com/thumb_back/fw800/background/20200808/pngtree-versus-screen-design-in-neon-style-image_389250.jpg)", backgroundSize: 'contain', height: "100%" , backgroundRepeat:"no-repeat"}}>

            <Row style={{ height: "100%",paddingTop:"100px" }}>
                
            
                {bandera === false ? (<><Col className="text-center p-2" ><img src={"https://robohash.org/" + props.nombre1} /> <h1 style={{ color: "white" }}>{props.nombre1}</h1></Col>
                {/* <img src={Rayo}/> */}
                <Col className="text-center p-2"><img src={"https://robohash.org/" + props.nombre2} /><h1 style={{ color: "white" }}>{props.nombre2}</h1></Col></>) : <Col className="text-center p-2" ><img   src={"https://robohash.org/" + nombre} /> <h1 style={{ color: "white"}}>{nombre}</h1></Col>}
            
            </Row>
            {""}


            <Row style={{ marginTop: "60px" }}>
                <Col className={"text-center"} ><Button className={"p-3"} style={{backgroundColor:"rgb(255,36,156)"}}  onClick={lucha} disabled={bandera} > A Batallar! <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lightning" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>
</svg></Button></Col>
            </Row>
            <Row>
                {/* <h1 style={{ color: "purple" }}>{nombre}</h1> */}
            </Row>
        </Container>
    )
}

export default Batalla;