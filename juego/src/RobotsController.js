const apiUrl = 'http://localhost:8080/api/';

export default class Controller {
    static getAll = () => {
        return new Promise((resuelve, falla) => {
            fetch(apiUrl + 'robots')
                .then(
                    data => {
                        return data.json();
                    }
                )
                .then(datos => resuelve(datos))
                .catch(err => falla(err));
        })
    }

    static readyForTheBattle = (id1,id2) => {
        return new Promise((resuelve, falla) => {
            fetch(apiUrl + 'batalla/'+id1+"/"+id2)
                .then(
                    data => {
                        return data.json();
                    }
                )
                .then(datos => resuelve(datos))
                .catch(err => falla(err));
        })
    }

    static getById =(id) => {
        return new Promise((resuelve, falla) => {
            fetch(apiUrl + 'robots/'+id)
                .then(
                    data => {
                        return data.json();
                    }
                )
                .then(datos => resuelve(datos))
                .catch(err => falla(err));
        })
    }
}