import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';




const Listado = (props) => {

   const filas = props.listadoRobots !==undefined ? props.listadoRobots.map((elemento,index)=>{
       let nombreFoto = "https://robohash.org/"+elemento.nombre;
    return(
        <tr key={index+"-tr"}  >
            <td>{elemento.nombre}</td>
            <td><img src={nombreFoto} alt="robot" width="100px"  /></td>
            <td>{elemento.experiencia}</td>
            
            <td><Button onClick={()=>props.choseme(elemento._id, elemento.nombre)}  >Elígeme</Button></td>
        </tr>
    )
   }) : null;

  return (
    <Table dark>
      <thead>
        <tr>
          <th>Nombre</th>
          <th></th>
          <th>Experiencia</th>
          
        </tr>
      </thead>
      <tbody >
        {filas}
      </tbody>
    </Table>
  );
}

export default Listado;