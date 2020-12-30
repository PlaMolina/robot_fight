const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//inicialitzem mongoose
const db = require("mongoose");
db.Promise = global.Promise;

const conn_url = "mongodb://localhost:27017/robots";

//connectem a la bdd
db.connect(conn_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexió OK!");
    })
    .catch(err => {
        console.log("Connexió falla...", err);
        process.exit();
    });

db.set('useFindAndModify', false);

//creem esquema i model 'Contacte'
const robotsCollection = db.Schema({ nombre: String, fuerza: Number, habilidad: Number, velocidad: Number, experiencia: Number, ganadas: Number, perdidas: Number });
const Robots = db.model('robots', robotsCollection);

const batallasCollection = db.Schema({ ganador_id: String, perdedor_id: String });
const Batalla = db.model('batallas', batallasCollection);


// definim rutes de la API
app.get("/", (req, res) => {
    res.send("<h1>Benvingut a la API de Robots!</h1>");
});

app.get("/api/batalla/:idg/:idp", (req, res) => {
    const id1 = req.params.idg;
    const id2 = req.params.idp;

    Robots.find({

        '_id': {
            $in: [
                db.Types.ObjectId(id1),
                db.Types.ObjectId(id2)
            ]
        }

    })

        .then(data => {
            let robot1 = data[0];
            let robot2 = data[1];
            let contador1 = 0;
            let contador2 = 0;
            let ganador;
            let perdedor;

            if (robot1.fuerza > robot2.fuerza) {
                contador1++;
            } else if (robot1.fuerza < robot2.fuerza) {
                contador2++;
            }

            if (robot1.velocidad > robot2.velocidad) {
                contador1++;
            } else if (robot1.velocidad < robot2.velocidad) {
                contador2++;
            }
            if (robot1.habilidad > robot2.habilidad) {
                contador1++;
            } else if (robot1.habilidad < robot2.habilidad) {
                contador2++;
            }

            if (contador1 > contador2) {
                ganador = robot1;
                perdedor = robot2;
            } else if (contador2 > contador1) {
                ganador = robot2;
                perdedor = robot1;
            } else {

                if (robot1.experiencia > robot2.experiencia) {
                    ganador = robot1;
                    perdedor = robot2;
                } else if (robot1.experiencia < robot2.experiencia) {
                    ganador = robot2;
                    perdedor = robot1;
                } else {
                    ganador = robot1;
                    perdedor = robot2;
                }

            }

            const batalla = new Batalla({ ganador_id: ganador._id, perdedor_id: perdedor._id });


            batalla.save(batalla)
                .then(data => { res.json(data) });

            Robots.findByIdAndUpdate(ganador._id, { 'experiencia': ganador.experiencia + 1, 'ganadas': ganador.ganadas + 1 })
                .then(data => { console.log(data) });
            Robots.findByIdAndUpdate(perdedor._id, { 'experiencia': perdedor.experiencia + 1, 'perdidas': perdedor.perdidas + 1 })
                .then(data => { console.log(data) });

        })


        .catch(err => {
            res.send({
                error: err.message || "Alguna cosa falla."
            });
        });
});

app.get("/api/estadistica", (req, res) => {

    Robots.find ()
      .sort({"ganadas": "descending"}).limit(10).then (data => {
       
        res.json(data);
        
    })
    .catch(err => {
        res.send({
            error: err.message || "Alguna cosa falla."
        });
    });



})


app.get("/api/partidas", (req, res) => {

    Batalla.find()
        .then(data => {
            // hacemos cosas con los datos antes de enviar...
            res.json(data);
        })
        .catch(err => {
            res.send({
                error: err.message || "Alguna cosa falla."
            });
        });
});



// consulta TOTS els contactes
app.get("/api/robots", (req, res) => {
    Robots.find()
        .then(data => {
            // hacemos cosas con los datos antes de enviar...
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                error: err.message || "Alguna cosa falla."
            });
        });
});


// consulta UN contacte per ID
app.get("/api/robots/:id", (req, res) => {
    const id = req.params.id;
    Robots.findById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                error: err.message || "Alguna cosa falla."
            });
        });
});

app.post("/api/robots", (req, res) => {
    const param = req.body;

    const robot = new Robots({

        nombre: param.nombre,
        fuerza: param.fuerza,
        habilidad: param.habilidad,
        velocidad: param.velocidad,
        experiencia: 0,
        ganadas: 0,
        perdidas: 0

    });

    robot.save(robot)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                error: err.message || "Alguna cosa falla."
            });

        });
});



// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

