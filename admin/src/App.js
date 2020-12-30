
import React, { useState } from "react";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { Container, Button, Row, Col } from "reactstrap";

import Home from "./Home";
import Nuevo from "./Nuevo";
import Lista from "./Lista";
import NotFound from "./P404";
import Elimina from "./Elimina";
import './App.css';


// componente APP
export default () => {
const pestañas = {
  width: "300px",
  textAlign:"center",
  fontFamily:"Bahnschrift, 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
}
  return (
    <div>
      <header className="App-header">
      <BrowserRouter >
        <Container>
          <div style={{height:"100px"}} />
          
          <ul style={{display:"flex", justifyContent:"space-around", fontSize:"2em"}} className="nav nav-tabs">
            <li style={pestañas} className="nav-item">
              <NavLink exact className="nav-link" to="/">
                Top 10
              </NavLink>
            </li>
            <li style={pestañas} className="nav-item">
              <NavLink className="nav-link" to="/robots">
                Estadísticas
              </NavLink>
            </li>
            <li style={pestañas} className="nav-item">
              <NavLink className="nav-link" to="/nuevo">
                Crear Robot
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/robots" component={Lista} />
            <Route path="/robots/eliminar/:id" component={Elimina} />
            <Route path="/nuevo" component={Nuevo} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
      </header>
    </div>
  );
};
