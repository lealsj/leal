let textoCompleto = "";

// Cargar archivo desde URL al cargar la página
window.onload = function() {
  const url = "LEYES/db01.txt"; // Cambia esta URL por la que necesites

  // Usamos fetch para obtener el archivo .txt desde la URL
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener el archivo desde la URL.");
      }
      return response.text();
    })
    .then(data => {
      textoCompleto = data;
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
};


//Funcion ihabiliatr button
function activarBoton() {
  		const input = document.getElementById("buscar").value;
  		const boton = document.getElementById("buscarBtn");

  		// Habilita el botón solo si hay al menos un carácter
  		boton.disabled = input.trim().length === 0;
		}

// Función para buscar las palabras en el archivo cargado
function buscarPalabras() {
  const consulta = document.getElementById("buscar").value.toLowerCase();
  const lineas = textoCompleto.split('\n');
  const coincidencias = lineas.filter(linea => linea.toLowerCase().includes(consulta));

  if (coincidencias.length) {
    let tablaHTML = "<table border='1' cellpadding='5'>";

    tablaHTML += `
      <thead><tr>
        <th>Fecha</th>
        <th>Título</th>
        <th>Resumen</th>
      </tr></thead><tbody>
    `;

    coincidencias.forEach(linea => {
      const columnas = linea.split('\t');
      tablaHTML += "<tr>";

      let ruta = columnas[1]?.replace(/"/g, "").trim().replace(/\\/g, "/") || "";
      ruta = ruta.substring(1);  // Ajusta la ruta si es necesario

      // Columna 4: Fecha
      let col3 = columnas[3]?.replace(/"/g, "").trim().substring(0, 10) || "";
      tablaHTML += `<td>${col3}</td>`;

      // Columna 5: Título (limitado a 10 caracteres)
      let col4 = columnas[4]?.replace(/"/g, "") || "";
      tablaHTML += `<td>${col4}</td>`;

      // Columna 6: Resumen
      let col5 = columnas[5]?.replace(/"/g, "") || "";
      tablaHTML += `<td><a href="${ruta}" target="_blank">${col5}...</a></td>`;

      tablaHTML += "</tr>";
    });

    tablaHTML += "</tbody></table>";
    document.getElementById("resultados").innerHTML = tablaHTML;
  } else {
    document.getElementById("resultados").innerHTML = "No se encontraron coincidencias.";
  }
}

