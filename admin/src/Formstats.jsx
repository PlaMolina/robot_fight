import React, { useState } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';

export default (props) => {
 
    const estiloBoton = {
        height: "2.4em",
    }

    const mas = () => {
        if (props.valor < 10) {
            props.modificar(props.valor + 1);
        } else {
            alert('No te pases, amigo');
        }
    }
    const menos = () => {
        if (props.valor > 0) {
            props.modificar(props.valor - 1);
        } else {
            alert('No puedes asignar valores negativos');
        }
    }


    return (
        <div>
            {props.char}
            <div style={{ display: "flex", margin: "5px" }}>
                <Button style={estiloBoton} onClick={menos}>-</Button>
                <FormGroup>
                    <Input type="text" style={{ textAlign: "center" }}
                        name={props.char} id={props.char} value={props.valor} onChange={(e) => props.modificar(e.target.value)}
                    />
                </FormGroup>
                <Button style={estiloBoton} onClick={mas} disabled={props.quitar}>+</Button>
            </div>
        </div>
    )
}