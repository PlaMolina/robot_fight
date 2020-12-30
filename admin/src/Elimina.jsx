import React, {useState, useContext, useEffect} from "react";
import {Redirect, Link} from "react-router-dom";
import Controller from './ContactesController';


export default (props) => {

  const [volver, setVolver] = useState(false);
  const [contacto, setContacto] = useState({});



  useEffect(()=>{
    const id = props.match.params.id;
    Controller.getById(id)
    .then(data => setContacto(data))
    .catch(err => {
      return <Redirect to="/robots" />;
    });
  }, [])

  const borrar = () => {
    Controller.deleteById(contacto.id);
    setVolver(true);
  }

  if (volver){
    return <Redirect to="/robots" />
  }

  return (
    <>
      <h3>¿Deseas eliminar el robot?</h3>
      <hr />
      <h1>{contacto.nom}</h1>
      <h3>email {contacto.email}</h3>
      <h3>tel {contacto.tel}</h3>
      <hr />
      <Link className='btn btn-primary' to='/robots' >Cancelar</Link>
      {' '}
      <button className='btn btn-danger' onClick={borrar} >Aceptar</button>
    </>
  );
};