let documentos = [];

// Cargar el archivo datos.txt al iniciar
window.onload = () => {
    fetch('datos.txt')
        .then(response => response.text())
        .then(texto => {
            const lineas = texto.trim().split('\n');
            documentos = lineas.map(linea => {
                const partes = linea.trim().split(/\s+/);
                return {
                    id: partes[0],
                    ruta: partes[1],
                    descripcion: partes.slice(2).join(' ')
                };
            });
        })
        .catch(error => {
            console.error('Error al cargar datos.txt:', error);
        });
};

// Función de búsqueda
function buscar() {
    const termino = document.getElementById('search').value.toLowerCase();
    const resultados = documentos.filter(doc => 
        doc.descripcion.toLowerCase().includes(termino)
    );

    mostrarResultados(resultados);
}

// Mostrar resultados en pantalla
function mostrarResultados(resultados) {
    const contenedor = document.getElementById('results');
    contenedor.innerHTML = '';

    if (resultados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    resultados.forEach(doc => {
        const enlace = document.createElement('a');
        enlace.href = doc.ruta;
        enlace.textContent = `ID: ${doc.id} - ${doc.descripcion}`;
        enlace.target = '_blank';
        contenedor.appendChild(enlace);
    });
}