export const generarTable = (datos, head = datos[0]) => {
  if (!(datos.constructor === Array)) return null;
  const table = document.createElement("table");
  table.appendChild(generarHead(head, true));
  table.appendChild(generarBody(datos, head));

  return table;
};

const generarHead = (primerDato, id) => {
  const tHead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in primerDato) {
    const value = primerDato[key];
    const th = document.createElement("th");
    th.textContent = value;
    if(id) th.id = key;
    tr.appendChild(th);
  }
  tHead.appendChild(tr);

  return tHead;
};

export const generarCheckBox = (head) => {
  const table = document.createElement("table");
  const tBody = document.createElement("tbody");
  const tr = document.createElement("tr");
  table.appendChild(generarHead(head));
  for (const key in head) {
    const td = document.createElement("td");
    const value = head[key];
    const checkbox = document.createElement('input');
    checkbox.id = 'chk' . key;
    checkbox.type = 'checkbox';
    checkbox.checked = true;

    checkbox.addEventListener('change', () => {
        actualizarVisibilidadColumna(key, checkbox.checked);
      });
      td.appendChild(checkbox);
      tr.appendChild(td);
  }
  tBody.appendChild(tr);
  table.appendChild(tBody);
  return table;
};

const generarBody = (datosParaCargar, head) => {
  const tBody = document.createElement("tbody");

  datosParaCargar.forEach((element) => {
    const tr = document.createElement("tr");
    for (const keyHead in head) {
      const td = document.createElement("td");
      for (const keyElement in element) {
        if (keyHead === keyElement) {
          td.textContent = element[keyElement];
          td.className = keyElement;
          break;
        } else {
          td.textContent = "N/A";
        }
      }
      tr.appendChild(td);
    }
    tBody.appendChild(tr);
  });

  return tBody;
};

const actualizarVisibilidadColumna = (key, checked) => {
  const thList = document.querySelectorAll(`th[id="${key}"]`);

  thList.forEach((th) => {
    const columnIndex = th.cellIndex;
    const tabla = th.closest('table');
    const filasDatos = tabla.querySelectorAll('tbody tr');

    if (checked) {
      th.style.display = '';
      filasDatos.forEach((fila) => {
        const celdas = fila.cells;
        if (celdas.length > columnIndex) {
          celdas[columnIndex].style.display = '';
        }
      });
    } else {
      th.style.display = 'none';
      filasDatos.forEach((fila) => {
        const celdas = fila.cells;
        if (celdas.length > columnIndex) {
          celdas[columnIndex].style.display = 'none';
        }
      });
    }
  });
};



