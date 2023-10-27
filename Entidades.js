class Persona {
    id;
    nombre;
    apellido;
    edad;

    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class Heroe extends Persona {
    alterego;
    ciudad;
    publicado

    constructor(id, nombre, apellido, edad, alterego, ciudad, publicado) {
        super(id, nombre, apellido, edad);
        this.alterego = alterego;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
}

class Villano extends Persona {
    enemigo;
    robos;
    asesinatos;

    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }
}

export {Persona, Heroe, Villano};