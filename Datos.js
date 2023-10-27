import {Heroe, Villano} from "./Entidades.js";
export const arrayPersonas = [{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}];
export const header = {"id":"Id", "nombre":"Nombre", "apellido":"Apellido", "edad":"Edad", "alterego":"Alter Ego", "ciudad":"Ciudad", "publicado":"Publicado", "enemigo":"Enemigo", "robos":"Robos", "asesinatos":"Asesinatos"};

export var idMax = 0;
arrayToLocal(arrayPersonas);

function localToArray()
{
    return JSON.parse(localStorage.getItem("personas"));
}

function arrayToLocal(array)
{
    localStorage.setItem("personas", JSON.stringify(array));
}

export function arrayObj()
{
    const array = localToArray();
    return array.map(obj => {
        if(obj.id > idMax) idMax = obj.id;
        if('ciudad' in obj) 
        {
            return new Heroe(obj.id, obj.nombre, obj.apellido, obj.edad, obj.alterego, obj.ciudad, obj.publicado);
        }
        else
        {
            return new Villano(obj.id, obj.nombre, obj.apellido, obj.edad, obj.enemigo, obj.robos, obj.asesinatos);
        }
    });
}

export function handlerCargar(obj)
{
    if(obj != null)
    {
    const array = arrayObj();
    array.push(obj);
    arrayToLocal(array);
    }
}

export function handlerEliminar(obj)
{
    if(obj != null)
    {
    var array = arrayObj();
    array = array.filter(objDelete =>
    objDelete.id != obj.id);
    arrayToLocal(array);
    }
}

export function handlerModificar(obj)
{
    if(obj != null)
    {
    handlerEliminar(obj);
    handlerCargar(obj);
    }
}

export function generarId()
{
    idMax += 1;
    return idMax;
}

