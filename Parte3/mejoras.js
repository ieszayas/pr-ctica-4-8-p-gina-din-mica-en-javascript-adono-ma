document.addEventListener('DOMContentLoaded', function() {

    // 1. ARRAY DE OBJETOS con datos de la tabla de tés
    const datosTés = [
        { tipo: 'Té verde Sencha', origen: 'Japón', temperatura: '70°C', infusion: '2-3 min' },
        { tipo: 'Té verde Longjing', origen: 'China', temperatura: '75°C', infusion: '2-3 min' },
        { tipo: 'Té negro Assam', origen: 'India', temperatura: '95°C', infusion: '3-5 min' },
        { tipo: 'Té negro Darjeeling', origen: 'India', temperatura: '90°C', infusion: '3-4 min' },
        { tipo: 'Té blanco Pai Mu Tan', origen: 'China', temperatura: '75°C', infusion: '4-5 min' },
        { tipo: 'Té Oolong Tieguanyin', origen: 'China', temperatura: '85°C', infusion: '3-4 min' },
        { tipo: 'Té Oolong Milk', origen: 'Taiwan', temperatura: '85°C', infusion: '3-4 min' },
        { tipo: 'Té rojo Pu-erh', origen: 'China', temperatura: '95°C', infusion: '4-5 min' },
        { tipo: 'Té matcha', origen: 'Japón', temperatura: '70°C', infusion: '1-2 min' },
        { tipo: 'Té chai especiado', origen: 'India', temperatura: '95°C', infusion: '5 min' }
    ];

    // 2. GENERAR TABLA DINÁMICAMENTE DESDE JS
    function generarTablaTés() {
        const contenedorTabla = document.querySelector('#tabla table');
        if (!contenedorTabla) {
            console.warn('No se encontró el contenedor de la tabla');
            return;
        }

        let html = `
            <thead class="table-tea">
                <tr>
                    <th>Tipo de té</th>
                    <th>Origen</th>
                    <th>Temp.</th>
                    <th>Infusionado</th>
                </tr>
            </thead>
            <tbody class="small">`;

        datosTés.forEach(té => {
            html += `
                <tr>
                    <td>${té.tipo}</td>
                    <td>${té.origen}</td>
                    <td>${té.temperatura}</td>
                    <td>${té.infusion}</td>
                </tr>`;
        });

        html += '</tbody>';
        contenedorTabla.innerHTML = html;
        console.log('Tabla generada dinámicamente con', datosTés.length, 'filas');
    }

    // 3. RESALTAR LENGUAJE (TIPO DE TÉ) SELECCIONADO
    const selectTipo = document.getElementById('tipo');
    if (selectTipo) {
        selectTipo.addEventListener('change', function() {
            // Eliminar resaltado previo de todas las opciones
            Array.from(this.options).forEach(opt => {
                opt.classList.remove('fw-bold', 'text-success', 'bg-light');
            });
            
            // Resaltar opción seleccionada
            const indiceSeleccionado = this.selectedIndex;
            if (this.value && this.value !== 'Elige una opción') {
                this.options[indiceSeleccionado].classList.add('fw-bold', 'text-success', 'bg-light');
                console.log('Tipo de té seleccionado:', this.value);
            }
        });
        console.log('Event listener para resaltado del select agregado');
    }

    // 4. ARRAY GLOBAL DE USUARIOS con localStorage
    let arrayUsuarios = JSON.parse(localStorage.getItem('usuariosTe')) || [];
    console.log('Usuarios cargados desde localStorage:', arrayUsuarios.length);

    // 5. MANEJO DEL FORMULARIO - Crear objeto y guardar en array
    const formSuscripcion = document.getElementById('suscripcionForm');
    if (formSuscripcion) {
        formSuscripcion.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar recarga de página

            // Validaciones
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const tipo = document.getElementById('tipo').value;
            const checkboxes = document.querySelectorAll('input[name="cafeina"]:checked');
            const comentarios = document.getElementById('comentarios').value.trim();

            if (!nombre || !email || !tipo || checkboxes.length === 0) {
                alert('Por favor, complete todos los campos requeridos');
                return;
            }

            // CREAR OBJETO JAVASCRIPT con los datos
            const nuevoUsuario = {
                nombre: nombre,
                email: email,
                tipo: tipo,
                nivelesCafeina: Array.from(checkboxes).map(cb => cb.value),
                comentarios: comentarios,
                fechaRegistro: new Date().toLocaleString('es-ES')
            };

            // GUARDAR EN ARRAY
            arrayUsuarios.push(nuevoUsuario);

            // MOSTRAR ARRAY POR CONSOLA con console.table()
            console.table(arrayUsuarios); // ★ BREAKPOINT ★

            // PERSISTIR EN LOCALSTORAGE
            localStorage.setItem('usuariosTe', JSON.stringify(arrayUsuarios));

            // Feedback al usuario
            alert(`¡Registrado! Número de usuarios: ${arrayUsuarios.length}`);
            
            // Limpiar formulario
            this.reset();
            
            console.log('Se ha agregado a ', nuevoUsuario);
        });
    }

    // INICIALIZAR TODO al cargar la página
    generarTablaTés();
    console.log('Mejoras.js cargado correctamente - Listo para depuración');
});