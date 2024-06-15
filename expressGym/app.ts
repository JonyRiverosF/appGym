import bodyParser from 'body-parser';
import express from 'express';
import morgan from "morgan";
import registros from './api/routes/registro';
import modificarHorario from "./api/routes/modificar"
import validaciones from "./api/routes/validaciones"
import consultas from "./api/routes/consultas"
const app = express ();
/*import wspClient from "./api/routes/wsp";

wspClient.initialize()*/


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'accept,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "false");

    // Pass to next layer of middleware
    next();
});
app.use(morgan("dev"))

app.use('/creacion',registros)
app.use("/modificar",modificarHorario)
app.use("/validaciones",validaciones)
app.use("/consultas",consultas)

export default module.exports = app
