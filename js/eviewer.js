let textoCompleto = "";

document.getElementById("archivoInput").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    textoCompleto = reader.result;
  };
  reader.readAsText(file);
});

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
	  ruta = ruta.substring(1);
	  
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
    document.getElementById("resultados").innerHTML = "No se encontraron leyes.";
  }
}