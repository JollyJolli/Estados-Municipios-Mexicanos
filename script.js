document.addEventListener('DOMContentLoaded', function() {
    const estadoSelect = document.getElementById('estadoSelect');
    const municipiosList = document.getElementById('municipiosList');

    // Hacer solicitud GET al JSON de estados y municipios
    fetch('https://raw.githubusercontent.com/martinciscap/json-estados-municipios-mexico/master/estados-municipios.json')
        .then(response => response.json())
        .then(data => {
            // Obtener todos los estados del JSON
            const estados = Object.keys(data);

            // Llenar el select con opciones de estados
            estados.forEach(estado => {
                const option = document.createElement('option');
                option.textContent = estado;
                option.value = estado;
                estadoSelect.appendChild(option);
            });

            // Agregar evento change al select para mostrar los municipios del estado seleccionado
            estadoSelect.addEventListener('change', function() {
                const selectedEstado = estadoSelect.value;
                const municipios = data[selectedEstado] || [];

                // Mostrar los municipios en la lista
                const municipiosHTML = municipios.map(municipio => `<li>${municipio}</li>`).join('');
                municipiosList.innerHTML = municipiosHTML;
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});
