const buscar = document.getElementById('buscar');
const resultados = document.getElementById('resultados');
const detalle = document.getElementById('detalle');
let leyes = [];

fetch('db.txt')
  .then(res => res.text())
  .then(txt => {
    leyes = txt.trim().split('\n').map(linea => {
      const partes = linea.split('\t');
      return {
        numero: partes[0],
        ruta: partes[1].replace(/\\/g, '/'),
        fecha: partes[3].split(' ')[0],
        titulo: partes[4].replace(/"/g, ''),
        sinopsis: partes[5].replace(/"/g, '')
      };
    });
    mostrarLeyes(leyes);
  });

function mostrarLeyes(lista) {
  resultados.innerHTML = '';
  lista.forEach(ley => {
    const li = document.createElement('li');
    li.textContent = `ley.numero -{ley.titulo}`;
    li.onclick = () => mostrarDetalle(ley);
    resultados.appendChild(li);
  });
}

function mostrarDetalle(ley) {
  detalle.innerHTML = `
    <p><strong>Título:</strong> ley.titulo</p>
    <p><strong>Fecha:</strong>{ley.fecha}</p>
    <p><strong>Sinopsis:</strong> ley.sinopsis</p>
    <p><a href="{ley.ruta}" target="_blank">Ver PDF</a></p>
  `;
}

buscar.addEventListener('input', () => {
  const q = buscar.value.toLowerCase();
  const filtrado = leyes.filter(ley =>
    ley.numero.includes(q) ||
    ley.fecha.includes(q) ||
    ley.titulo.toLowerCase().includes(q) ||
    ley.sinopsis.toLowerCase().includes(q)
  );
  mostrarLeyes(filtrado);
});