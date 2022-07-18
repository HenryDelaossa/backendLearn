class Usuario {
    constructor({ name = String, lastName = String }) {
        this.name = name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        this.lastName = lastName.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        this.libros = new Array()
        this.mascotas = new Array()
    }
    getFullname() {
        return `${this.name} ${this.lastName}`
    }
    addMascota({ mascota }) {
        return !mascota ? `debes especificar el nombre de la mascota` : this.mascotas.push(mascota)
    }
    countMascotas() {
        return this.mascotas.length <= 0 ? `no hay mascotas agregadas` : this.mascotas.length
    }
    addBook({ bookName, bookAuthor }) {
        return (!bookName && !bookAuthor) ? `debes especificar en este metodo nombre y autor valido, ej: {bookName:"name"}`
            :
            this.libros.push({ bookName, bookAuthor })
    }
    getBookNames() {
        return this.libros.length <= 0 ? `no tienes libros agregados` : this.libros.map((lib) => lib.bookName)
    }
}

const nuevoUser = new Usuario({ name: 'henry david', lastName: 'de la ossa gomez' })
// nombre completo
console.log(nuevoUser.getFullname());
// agregando mascotas
console.log(nuevoUser.addMascota({ mascota: "mi lila" }));
console.log(nuevoUser.addMascota({ mascota: "luna" }));
console.log(nuevoUser.addMascota({ mascota: "nhei" }));
// agregando libros y autores
console.log(nuevoUser.addBook({ bookName: 'henrylibro1', bookAuthor: 'henryAuthor1' }));
console.log(nuevoUser.addBook({ bookName: 'henrylibro2', bookAuthor: 'henryAuthor2' }));
console.log(nuevoUser.addBook({ bookName: 'henrylibro3', bookAuthor: 'henryAuthor3' }));
// obteniendo cantidad de mascotas
console.log(nuevoUser.countMascotas());
// obteiendo nombres de libros
console.log(nuevoUser.getBookNames());