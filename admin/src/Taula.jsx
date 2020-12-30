import React, {useContext} from "react";
import { Table } from "reactstrap";
import {
  Link,
} from "react-router-dom";



export default (props) => {

  // useContext da acceso al contenido del último provider para este contexto
  // en este caso, el contenido incluye la función traduce, que utilizamos para 
  // mostrar los mensajes en el idioma de la aplicación
  // al cambiar el idioma se produce un nuevo render en App que afecta a todo el arbol de componentes

  const filas = props.datos.map((el) => (
    <tr key={el.id}>
      {props.columnas.map((col, idx) => 
        <td key={idx}>
          {el[col['titol']]}
        </td>)}
      {props.boton?<td><Link className="btn btn-danger btn-sm" to={props.rutaDelete + el.id} >Eliminar</Link></td>:null}
    </tr>
  ));

  return (
    <>

    <Table striped style={{backgroundColor:"rgb(70, 37, 37)",color:"white"}} size='sm'>
      <thead>
        <tr>
          {props.columnas.map((el, idx) => 
            <th key={idx}>
              {/* {el['titol']} */}
              {el['titol'].charAt(0).toUpperCase() + el['titol'].slice(1).replace(/_/g,' ')}
            </th>)}
        </tr>
      
      </thead>
      <tbody>{filas}</tbody>
      <tfoot></tfoot>
    </Table>
    </>
  );
};
