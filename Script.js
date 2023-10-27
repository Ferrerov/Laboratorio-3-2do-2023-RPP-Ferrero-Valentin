import {
  handlerCargar,
  handlerModificar,
  handlerEliminar,
  idMax,
  arrayObj,
  header,
} from "./Datos.js";
import { Heroe, Villano } from "./Entidades.js";
import { generarTable, generarCheckBox } from "./TablaDinamica.js";

const seccionTabla = document.getElementById("seccionTable");
const seccionCheckBox = document.getElementById("seccionCheckBox");
const selectTipo = document.querySelector(".tipoPersona");
const selectFiltro = document.querySelector(".tipoPersonaFiltro");
const formulario = document.forms[0];
const botonGuardar = document.getElementById("btnGuardar");
const botonEliminar = document.getElementById("btnEliminar");
const botonModificar = document.getElementById("btnModificar");
const botonCalcular = document.getElementById("btnCalcular");
let direccionSort = false;

window.onload = () => {
    refrescarTabla(seccionTabla, arrayObj());
    document.getElementById("txtId").value = idMax + 1;
    seccionCheckBox.appendChild(generarCheckBox(header));
};

selectTipo.addEventListener("change", (event) => {
  ocultarMostrarDiv();
});
selectFiltro.addEventListener("change", (event) => {
  refrescarTabla(seccionTabla, filtrarFilas(arrayObj(), selectFiltro.value));
  console.log(selectFiltro.value);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  handlerCargar(CrearPersona());
  refrescarTabla(seccionTabla, arrayObj());
  formulario.reset();
  ocultarMostrarDiv();
});

botonModificar.addEventListener("click", (e) => {
  e.preventDefault();
  handlerModificar(CrearPersona());
  refrescarTabla(seccionTabla,arrayObj());
  formulario.reset();
  ocultarMostrarDiv();
});

botonEliminar.addEventListener("click", (e) => {
  handlerEliminar(CrearPersona());
  refrescarTabla(seccionTabla,arrayObj());
  formulario.reset();
  ocultarMostrarDiv();
});
botonCalcular.addEventListener("click", (e) => {
  console.log(CalcularEdadPromedio());
  document.getElementById("txtEdadPromedio").value = CalcularEdadPromedio();
});

function CrearPersona()
{
  const {
    txtId,
    txtNombre,
    txtApellido,
    txtEdad,
    txtAlterEgo,
    txtCiudad,
    txtPublicado,
    txtEnemigo,
    txtRobos,
    txtAsesinatos
  } = formulario;

  let nuevaPersona = null;
  if (selectTipo.value === "Heroe") {
    nuevaPersona = new Heroe(
      txtId.value,
      txtNombre.value,
      txtApellido.value,
      txtEdad.value,
      txtAlterEgo.value,
      txtCiudad.value,
      txtPublicado.value
    );
  } else if (selectTipo.value === "Villano") {
    nuevaPersona = new Villano(
      txtId.value,
      txtNombre.value,
      txtApellido.value,
      txtEdad.value,
      txtEnemigo.value,
      txtRobos.value,
      txtAsesinatos.value
    );
  }
  return nuevaPersona;
}

function ocultarMostrarDiv() {
  document.getElementById("txtId").value = parseInt(idMax) + 1;
  const tipoPersona = selectTipo.value;
  var tipoHeroe = document.getElementById("fieldHeroe");
  var tipoVillano = document.getElementById("fieldVillano");
  var txtAlterEgo = document.getElementById("txtAlterEgo");
  var txtCiudad = document.getElementById("txtCiudad");
  var txtPublicado = document.getElementById("txtPublicado");
  var txtEnemigo = document.getElementById("txtEnemigo");
  var txtRobos = document.getElementById("txtRobos");
  var txtAsesinatos = document.getElementById("txtAsesinatos");

  if (tipoPersona == "Heroe") {
    tipoHeroe.style.display = "block";
    tipoVillano.style.display = "none";
    txtAlterEgo.required = true;
    txtCiudad.required = true;
    txtPublicado.required = true;
    txtEnemigo.required = false;
    txtRobos.required = false;
    txtAsesinatos.required = false;
  } else if (tipoPersona == "Villano") {
    tipoVillano.style.display = "block";
    tipoHeroe.style.display = "none";
    txtEnemigo.required = true;
    txtRobos.required = true;
    txtAsesinatos.required = true;
    txtAlterEgo.required = false;
    txtCiudad.required = false;
    txtPublicado.required = false;
  } else {
    tipoHeroe.style.display = "none";
    tipoVillano.style.display = "none";
    txtEnemigo.required = false;
    txtRobos.required = false;
    txtAsesinatos.required = false;
    txtAlterEgo.required = false;
    txtCiudad.required = false;
    txtPublicado.required = false;
  }

  botonGuardar.disabled = false;
  botonEliminar.disabled = true;
  botonModificar.disabled = true;
}

window.addEventListener("click", (e) =>
{
    if (e.target.matches("th")) {
        refrescarTabla(seccionTabla, ordernarPorColumna(e.target["id"]));
      }
    else if(e.target.matches("td"))
    {
        let trClickeada = e.target.parentElement;
        if(trClickeada.getElementsByTagName("td")[4].textContent != "N/A")
        {
            cambiarSeleccion("Heroe");
        }
        else
        {
            cambiarSeleccion("Villano");
        }
        ocultarMostrarDiv();
        document.getElementById("txtId").value = trClickeada.getElementsByTagName("td")[0].textContent;
        document.getElementById("txtNombre").value = trClickeada.getElementsByTagName("td")[1].textContent;
        document.getElementById("txtApellido").value = trClickeada.getElementsByTagName("td")[2].textContent;
        document.getElementById("txtEdad").value = trClickeada.getElementsByTagName("td")[3].textContent;
        document.getElementById("txtAlterEgo").value = trClickeada.getElementsByTagName("td")[4].textContent;
        document.getElementById("txtCiudad").value = trClickeada.getElementsByTagName("td")[5].textContent;
        document.getElementById("txtPublicado").value = trClickeada.getElementsByTagName("td")[6].textContent;
        document.getElementById("txtEnemigo").value = trClickeada.getElementsByTagName("td")[7].textContent;
        document.getElementById("txtRobos").value = trClickeada.getElementsByTagName("td")[8].textContent;
        document.getElementById("txtAsesinatos").value = trClickeada.getElementsByTagName("td")[9].textContent;

        botonGuardar.disabled = true;
        botonEliminar.disabled = false;
        botonModificar.disabled = false;
    }

});

function cambiarSeleccion(tipo)
{
    const $select = document.querySelector(".tipoPersona");
    const $opciones = Array.from($select.options);
    const opcionSeleccionar = $opciones.find(item => item.text === tipo);

    opcionSeleccionar.selected = true;

}

function refrescarTabla(seccionTabla, arrayObj) {
  if (seccionTabla.hasChildNodes) {
    while(seccionTabla.firstChild) seccionTabla.removeChild(seccionTabla.firstChild);
    
    seccionTabla.appendChild(generarTable(arrayObj, header));
  } else {
    seccionTabla.appendChild(generarTable(arrayObj, header));
  }
}

function ordernarPorColumna(columna) {
  let dataType = undefined;
  let index = 0;
  do {
    dataType = typeof arrayObj()[index][columna];
    index++;
  } while (dataType === "undefined");
  direccionSort = !direccionSort;
  if (dataType === "number") {
    return ordernarPorColumnaNumber(direccionSort, columna);
  } else {
    return ordernarPorColumnaString(direccionSort, columna);
  }
}

function ordernarPorColumnaString(direccionSort, columna) {
  const dataSort = arrayObj().sort((a, b) => {
    a = a[columna].toLowerCase();
    b = b[columna].toLowerCase();
    if (direccionSort) {
      if (a < b) return -1;
      if (a > b) return 1;
    } else {
      if (a > b) return -1;
      if (a < b) return 1;
    }
    return 0;
  });
  return dataSort;
}

function ordernarPorColumnaNumber(direccionSort, columna) {
  const dataSort = arrayObj().sort((a, b) => {
    let aDato = a[columna];
    let bDato = b[columna];
    if (aDato == undefined) aDato = -1;
    if (bDato == undefined) bDato = -1;
    return direccionSort ? aDato - bDato : bDato - aDato;
  });
  return dataSort;
}

function filtrarFilas(datos, seleccion) {
  return datos.filter(persona => {
    if (seleccion === 'Heroe') {
      return persona instanceof Heroe;
    } else if (seleccion === 'Villano') {
      return persona instanceof Villano;
    } else {
      return true;
    }
  });
}

function CalcularEdadPromedio()
{
  const elementos = document.querySelectorAll('.edad');
  const suma = Array.from(elementos).reduce((total, elemento) => {
    const valor = parseFloat(elemento.textContent);
    return total + valor;
  }, 0);
return suma / elementos.length;
}

