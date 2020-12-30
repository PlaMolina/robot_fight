import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { FormGroup, Label, Input } from 'reactstrap';
import Formstats from './Formstats';

import Controller from './ContactesController';

export default (props) => {

  const [nom, setNom] = useState('');
  const [velocidad, setVelocidad] = useState(0);
  const [fuerza, setFuerza] = useState(0);
  const [habilidad, setHabilidad] = useState(0);
  const [exp, setExp] = useState(0);
  const [volver, setVolver] = useState();
  const [suma, setSuma] = useState(0);
  const [desabilitar,setDesabilitar] = useState(false);


useEffect(()=>{
  let sumaTotal =velocidad+fuerza+habilidad;
  setSuma(sumaTotal);
  console.log(sumaTotal);
  if (sumaTotal==10){
    setDesabilitar(true);
  }else{
    setDesabilitar(false);
  }
},[velocidad,fuerza,habilidad]);

  const guardar = () => {
    const clienteNuevo = {
      nombre: nom,
      fuerza,
      velocidad,
      habilidad,
    };
    // aqui haríamos una primera validación del form
    // si todo ok seguimos
    Controller.addItem(clienteNuevo);
    setVolver(true);
  }

  if (volver) {
    return <Redirect to="/robots" />
  }

  const avatar = !nom ? `https://robohash.org/${Math.random()}` : `https://robohash.org/${nom}`;
  return (
    <>
      <h3>Crea un robot</h3>
      <hr />
  
      <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "600px" }}>
          <FormGroup>
            <Label for="nom">Nombre</Label>
            <Input type="text" name="nom" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
          </FormGroup>
          <h3>Asigna 10 puntos</h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Formstats quitar={desabilitar} char="Fuerza" modificar={setFuerza} valor={fuerza} />

            <Formstats quitar={desabilitar} char="Habilidad" modificar={setHabilidad} valor={habilidad} />

            <Formstats quitar={desabilitar} char="Velocidad" modificar={setVelocidad} valor={velocidad} />
          </div>

          <hr />
          <Link className='btn btn-danger' to='/robots' >Cancelar</Link>
          {' '}
          <button className='btn btn-info' onClick={guardar} >Guardar</button>
        </div>
        <div>
          <img src={avatar} alt="Robot" />
        </div>
      </div>
    </>
  );
};
