import React, { useContext, useEffect, useState } from "react";
import Controller from "./ContactesController";

import { Row, Col } from "reactstrap";


import Taula from "./Taula";

export default () => {
  const [dades, setDades] = useState([]);
  const [error, setError] = useState('');


  useEffect(()=>{
    Controller.getAll()
     .then(data => setDades(data))
     .catch(err => setError(err.message));
   }, [])

  const columnes = [
    {
      titol: "nombre",
    },
    {
      titol: "fuerza",
    },
    {
      titol: "velocidad",
    },
    {
      titol: "habilidad",
    },
    {
      titol: "experiencia",
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <h3>Listado robots</h3>
        </Col>
      </Row>

      <Taula
        datos={dades}
        columnas={columnes}
        rutaDelete="/robots/eliminar/"
        boton="true"
      />

      {error && <h3>Error: {error}</h3>}
    </>
  );
};
