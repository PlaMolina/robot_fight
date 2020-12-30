import { Row, Col } from "reactstrap";
import React, { useContext, useEffect, useState } from "react";
import Controller from "./ContactesController";

import Taula from "./Taula";

export default () => {
  const [dades, setDades] = useState([]);
  const [error, setError] = useState('');


  useEffect(()=>{
    Controller.getAllEstadisticas()
     .then(data => setDades(data))
     .catch(err => setError(err.message));
   }, [])

  const columnes = [
    {
      titol: "nombre",
    },
    {
      titol: "ganadas",
    },
    {
      titol: "perdidas",
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <h3>Top 10</h3>
        </Col>
      </Row>

      <Taula
        datos={dades}
        columnas={columnes}
    
      />

      {error && <h3>Error: {error}</h3>}
    </>
  );
};
