const fs = require("fs");
const express = require('express');
const { Contenedor } = require("./index");

const app = express();
const { Router } = express;


const port = 8080;

const router = Router()
app.use(express.static("public"))
app.use("/static", express.static(__dirname + "/public"))
app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/public/index.html")
})

app.use("/api", router)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const losProductos = [
    {
        title: "producto1",
        precio: 123456,
        img: "rutaImg1.png"
    },
    {
        title: "producto2",
        precio: 12345623,
        img: "rutaImg2.png"
    },
    {
        title: "producto3",
        precio: 1232345456,
        img: "rutaImg3.png"
    },
    {
        title: "producto4",
        precio: 12345246,
        img: "rutaImg4.png"
    },
    {
        title: "producto5",
        precio: 122443456,
        img: "rutaImg5.png"
    },
    {
        title: "producto6",
        precio: 123344456,
        img: "rutaImg6.png"
    },
    {
        title: "producto7",
        precio: 123434456,
        img: "rutaImg7.png"
    }
]
const productos = new Contenedor('./productos.json')
losProductos.forEach((product) => {
    productos.save(product)
})


router.get("/productos", (req, res) => {
    res.send(productos.getAll())
}).post((req, res) => {
    let newproduct = req.body
    productos.save(newproduct)
    res.send({ 'producto agregado': newproduct });
})

router.get("/productos/:id", (req, res) => {
    let id = Number(req.params.id)
    if (productos.getById(id) == null) {
        res.send({ error: 'producto no encontrado' })
    } else {
        res.send(productos.getById(id))
    }
}).put((req, res) => {
    let id = Number(req.params.id)
    let newprod = req.body
    res.send(productos.putUpload(id, newprod))
}).delete((req, res) => {
    let id = Number(req.params.id)
    res.send(productos.deleteById(id))
})



app.listen(port, () => {
    console.log("servidor escuchando en el puerto:", port)
})
app.on("error", error => console.log(`Error en : ${error}`))