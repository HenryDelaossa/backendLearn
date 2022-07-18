const fs = require("fs")

class Contenedor {
    constructor(rutaArchivo) {
        this.RutaArchivo = rutaArchivo;
        this.Archiv = new Array();
    }
    save(objeto) {
        let idAdded = this.Archiv.length;
      /*para evitar que se ingrese un id diferente ====>>>*/ delete objeto.id;
        Object.assign(objeto, { id: idAdded + 1 });
        try {
            this.Archiv.push(JSON.stringify(objeto));
            fs.writeFileSync(this.RutaArchivo, JSON.stringify(this.Archiv));
            console.log(
                `has agregado : ${JSON.stringify(objeto)}\n su id: ${objeto.id}`
            );
        } catch (err) {
            console.error("error en metodo save()", err);
        }
    }
    getById(num) {
        if (num <= this.Archiv.length || num == !null || num == !undefined) {
            return JSON.parse(fs.readFileSync(`${this.RutaArchivo}`, "utf-8")).map((element) => JSON.parse(element)).filter((el) => el.id === num);
        } else {
            return `${null} {no existe ningun producto con este id}`;
        }
    }
    getAll() {
        return this.Archiv.map((e) => JSON.parse(e));
    }
    deleteById(numId) {
        let finfElemenDelet = JSON.parse(fs.readFileSync(`${this.RutaArchivo}`, "utf-8")).map((element) => JSON.parse(element));
        let fil = JSON.stringify(finfElemenDelet.filter((el) => el.id !== numId));
        fs.writeFileSync(this.RutaArchivo, JSON.stringify(fil));
    }
    deleteAll() {
        fs.writeFileSync(`${this.RutaArchivo}`, JSON.stringify([]));
    }
    getIdAleat() {
        let arch = JSON.parse(fs.readFileSync(`${this.RutaArchivo}`, "utf-8")).map((itm) => JSON.parse(itm))
        return Math.floor(Math.random() * (arch.length - 1)) + 1
    }
}

const rutaProductos = "./productos/productos.json";
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
const newProduct3 = {
    title: "producto 3",
    price: 15300,
    thumb: "rutaimg.jpg",
};
const newProduct4 = {
    title: "producto 4",
    price: 11300,
    thumb: "rutaimg.jpg",
};


const prueba = new Contenedor(rutaProductos);
prueba.save(newProduct1);
prueba.save(newProduct2);
prueba.save(newProduct3);
prueba.save(newProduct4);
console.log(prueba.getById(prueba.getIdAleat()));
console.log(prueba.getAll());