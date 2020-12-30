import { v4 as uuid } from "uuid";

const api_url = 'http://localhost:8080/api/';

export default class Controller {

    static getAll = async() => {
        let resp = await fetch(api_url + "robots");
        if (!resp.ok) {
            throw new Error('Error en fetch');
        } else {
            resp = await resp.json();
            return resp.map(el => ({...el, id: el._id }));
        }
    }

    static getAllEstadisticas = async() => {
        let resp = await fetch(api_url + "estadistica");
        if (!resp.ok) {
            throw new Error('Error en fetch');
        } else {
            resp = await resp.json();
            return resp.map(el => ({...el, id: el._id }));
        }
    }

    static getAll2 = () => {
        return new Promise(
            (resuelve, falla) => {
                fetch(api_url)
                    .then(data => data.json())
                    .then(datos => {
                        const retorn = datos.map(el => {
                            el.id = el._id;
                            return el;
                        });
                        resuelve(retorn);
                    })
                    .catch(err => {
                        falla(err);
                    });
            });

    }



    static saveAll = (data) => {
        const json = JSON.stringify(data);
        localStorage.setItem('infoContactes', json);
    }


    static getById = (itemId) => {
        const promesa = (resuelve, falla) => {
            fetch(api_url + '/' + itemId)
                .then(data => data.json())
                .then(contacto => {
                    contacto.id = contacto._id;
                    contacto.tel = contacto.telefon;
                    resuelve(contacto);
                })
                .catch(err => {
                    falla(err);
                });
        };

        return new Promise(promesa);
    }


    static addItem = (item) => {
        const jsonContacte = JSON.stringify(item);
        const opcionesFetch = {
            method: "POST",
            body: jsonContacte,
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(api_url+'robots', opcionesFetch)
            .then(resp => {
                console.log("nuevo contacto:", resp)
            })
            .catch(err => console.log("error nuevo contacto", err));

    }

    static replaceItem = (item) => {

    }

    static deleteById = (itemId) => {
        fetch(api_url + '/' + itemId, { method: 'DELETE' });
    }


}