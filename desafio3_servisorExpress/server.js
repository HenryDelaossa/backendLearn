// DESAFIO 3 ⇊⇊
const express = require('express');
const { Contenedor } = require('./index');

const app = express();
PORT = 8080;


const classProductos = new Contenedor('./productosServer.json')
const newProduct1 = {
    title: "producto 1",
    price: 10400,
    thumb: "rutaimg.jpg",
    id: "eiughekfhg",
};
const newProduct2 = {
    title: "producto 2",
    price: 18300,
    thumb: "rutaimg.jpg",
};
classProductos.save(newProduct1);
classProductos.save(newProduct2)



app.listen(PORT, () => {
    console.log("servidor escuchando en el puerto:", PORT)
})
app.on("error", error => console.log(`Error en servidor ${PORT}: ${error}`))


app.get("/productos", (req, res) => {
    let productos = classProductos.getAll()
    res.send(productos);
});

app.get("/productosRandom", (req, res) => {
    res.send(classProductos.getRamdon());
});