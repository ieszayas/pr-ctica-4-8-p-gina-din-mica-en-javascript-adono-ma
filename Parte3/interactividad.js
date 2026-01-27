// INTERACTIVIDAD.JS - Funcionalidades avanzadas del proyecto de tés
document.addEventListener('DOMContentLoaded', function() {

    // DATOS PARA CRONÓMETRO (coincide con tabla principal)
    const tiemposInfusion = {
        'Verde': '2-3 min',
        'Negro': '3-5 min',
        'Blanco': '4-5 min',
        'Oolong': '3-4 min'
    };

    // 1. RELOJ DIGITAL/ANALÓGICO debajo de Guía Rápida
    function crearReloj() {
        const guiaRapida = document.querySelector('aside .card-body');
        if (!guiaRapida) return;

        const relojContainer = document.createElement('div');
        relojContainer.id = 'relojContainer';
        relojContainer.className = 'mt-3 p-3 border rounded bg-light';
        relojContainer.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">¿Qué hora es?</h6>
                <button id="toggleReloj" class="btn btn-sm btn-outline-secondary">Analógico</button>
            </div>
            <div id="relojDigital" class="h4 mb-0 fw-bold text-center"></div>
            <canvas id="relojAnalogico" width="120" height="120" class="d-none mx-auto" style="border-radius:50%;"></canvas>
        `;
        guiaRapida.appendChild(relojContainer);

        let modoDigital = true;
        const digitalEl = document.getElementById('relojDigital');
        const analogicoEl = document.getElementById('relojAnalogico');
        const toggleBtn = document.getElementById('toggleReloj');

        function actualizarReloj() {
            const ahora = new Date();
            const tiempo = ahora.toLocaleTimeString('es-ES', { hour12: false });
            digitalEl.textContent = tiempo;

            // Analógico simple
            const ctx = analogicoEl.getContext('2d');
            ctx.clearRect(0, 0, 120, 120);
            ctx.strokeStyle = '#6c6969';
            ctx.lineWidth = 2;
            const centroX = 60, centroY = 60, radio = 50;

            // Círculo
            ctx.beginPath();
            ctx.arc(centroX, centroY, radio, 0, 2 * Math.PI);
            ctx.stroke();

            // Manecillas
            const horas = ahora.getHours() % 12;
            const minutos = ahora.getMinutes();
            const segundos = ahora.getSeconds();

            // Hora
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(centroX, centroY);
            ctx.lineTo(centroX + Math.sin((horas * 30 + minutos * 0.5) * Math.PI / 180) * 30, 
                       centroY - Math.cos((horas * 30 + minutos * 0.5) * Math.PI / 180) * 30);
            ctx.stroke();

            // Minuto
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centroX, centroY);
            ctx.lineTo(centroX + Math.sin(minutos * 6 * Math.PI / 180) * 40,
                       centroY - Math.cos(minutos * 6 * Math.PI / 180) * 40);
            ctx.stroke();

            // Segundo
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(72, 120, 21)';
            ctx.beginPath();
            ctx.moveTo(centroX, centroY);
            ctx.lineTo(centroX + Math.sin(segundos * 6 * Math.PI / 180) * 45,
                       centroY - Math.cos(segundos * 6 * Math.PI / 180) * 45);
            ctx.stroke();
        }

        toggleBtn.addEventListener('click', function() {
            modoDigital = !modoDigital;
            digitalEl.classList.toggle('d-none', !modoDigital);
            analogicoEl.classList.toggle('d-none', modoDigital);
            this.textContent = modoDigital ? 'Analógico' : 'Digital';
        });

        actualizarReloj();
        setInterval(actualizarReloj, 1000);
    }

    // 2. MODAL CRONÓMETRO para tabla de tés
    function crearModalCrono() {
        const modalHtml = `
        <div class="modal fade" id="modalCrono" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-tea text-white">
                        <h5 class="modal-title" id="modalTitulo">Infusionar Té</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="mb-4">
                            <img src="https://via.placeholder.com/300x200/90EE90/228B22?text=Taza+de+Té" 
                                 alt="Taza de té" class="img-fluid rounded shadow" style="cursor:pointer;" id="imgPopup">
                        </div>
                        <div class="h3 mb-4 fw-bold text-primary" id="cronoDisplay">00:00</div>
                        <div class="btn-group" role="group">
                            <button id="btnStart" class="btn btn-success">Start</button>
                            <button id="btnStop" class="btn btn-warning" disabled>Stop</button>
                            <button id="btnReset" class="btn btn-secondary">Reset</button>
                        </div>
                        <div class="mt-3 small text-muted" id="tiempoObjetivo"></div>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = new bootstrap.Modal(document.getElementById('modalCrono'));
        let cronometro = 0, intervalo, tiempoObj = '';

        document.getElementById('btnStart').addEventListener('click', () => {
            if (!intervalo) {
                intervalo = setInterval(() => {
                    cronometro++;
                    const mins = Math.floor(cronometro / 60).toString().padStart(2, '0');
                    const segs = (cronometro % 60).toString().padStart(2, '0');
                    document.getElementById('cronoDisplay').textContent = `${mins}:${segs}`;
                }, 1000);
                document.getElementById('btnStart').disabled = true;
                document.getElementById('btnStop').disabled = false;
            }
        });

        document.getElementById('btnStop').addEventListener('click', () => {
            clearInterval(intervalo);
            intervalo = null;
            document.getElementById('btnStart').disabled = false;
            document.getElementById('btnStop').disabled = true;
        });

        document.getElementById('btnReset').addEventListener('click', () => {
            clearInterval(intervalo);
            intervalo = null;
            cronometro = 0;
            document.getElementById('cronoDisplay').textContent = '00:00';
            document.getElementById('btnStart').disabled = false;
            document.getElementById('btnStop').disabled = true;
        });

        document.getElementById('imgPopup').addEventListener('click', () => {
            cronometro = 0;
            document.getElementById('cronoDisplay').textContent = '00:00';
            document.getElementById('btnStart').disabled = false;
            document.getElementById('btnStop').disabled = true;
        });

        return modal;
    }

    // 3. HACER CLICABLE la tabla principal
    function hacerTablaInteractiva(modal) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('#tabla td:first-child')) { // Primera columna (Tipo de té)
                const tipoTe = e.target.closest('tr').querySelector('td:first-child').textContent;
                document.getElementById('modalTitulo').textContent = `Infusionar ${tipoTe}`;
                document.getElementById('tiempoObjetivo').textContent = `Objetivo: ${tiemposInfusion[tipoTe.split(' ')[1]] || '3 min'}`;
                modal.show();
            }
        });
    }

    // 4. BUSCADOR DINÁMICO para tabla
    function crearBuscadorTabla() {
        const tablaSection = document.querySelector('#tabla');
        if (!tablaSection) return;

        const buscadorHtml = `
        <div class="mb-3">
            <input type="text" id="buscadorTabla" class="form-control" placeholder="Buscar tipo de té, origen...">
        </div>`;
        tablaSection.insertAdjacentHTML('afterbegin', buscadorHtml);

        const buscador = document.getElementById('buscadorTabla');
        const filas = document.querySelectorAll('#tabla tbody tr');

        buscador.addEventListener('input', function() {
            const termino = this.value.toLowerCase();
            filas.forEach(fila => {
                const texto = fila.textContent.toLowerCase();
                fila.style.display = texto.includes(termino) ? '' : 'none';
            });
        });
    }

    // 5. MAPA TETERÍAS + FORMULARIO (debajo carrusel)
    function crearMapaTeterias() {
        const carrusel = document.getElementById('teaCarousel');
        if (!carrusel) return;

        const mapaSection = document.createElement('section');
        mapaSection.className = 'mt-5';
        mapaSection.innerHTML = `
        <h3 class="text-center mb-5">Busca tu tetería más cercana</h3>
        <div class="row">
            <div class="col-lg-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.5!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228474f3f2c5b%3A0x4b4b4b4b4b4b4b4b!2sMadrid!5e0!3m2!1ses!2ses!4v1624523797308" 
                        class="h-100 w-100 rounded shadow" style="border:0; height: 400px;" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="col-lg-7">
                <form id="formTeterias">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row mb-4">
                                <div class="col-md-6 mb-4 mb-md-0">
                                    <input type="text" class="form-control" id="nombreTeteria" placeholder="Nombre tetería">
                                </div>
                                <div class="col-md-6">
                                    <input type="email" class="form-control" id="emailTeteria" placeholder="Tu email">
                                </div>
                            </div>
                            <input type="text" class="form-control mb-4" id="ciudadTeteria" placeholder="Ciudad">
                            <textarea class="form-control mb-4" rows="4" id="comentarioTeteria" placeholder="Comentarios"></textarea>
                            <button type="submit" class="btn btn-primary">Buscar Tetería</button>
                        </div>
                        <div class="col-md-3">
                            <ul class="list-unstyled">
                                <li class="mb-3"><strong>Madrid Centro</strong><br><small>C. Preciados 12</small></li>
                                <li class="mb-3"><strong>Chueca</strong><br><small>P. de Chueca 5</small></li>
                                <li><strong>Salamanca</strong><br><small>C. Serrano 45</small></li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;
        
        carrusel.parentNode.insertBefore(mapaSection, carrusel.nextSibling);

        // Formulario funcional
        document.getElementById('formTeterias').addEventListener('submit', function(e) {
            e.preventDefault();
            const ciudad = document.getElementById('ciudadTeteria').value;
            alert(`Buscando teterías en ${ciudad || 'Madrid'}... ¡Encuentra tu favorita!`);
        });
    }

    // INICIALIZAR TODO
    crearReloj();
    const modalCrono = crearModalCrono();
    hacerTablaInteractiva(modalCrono);
    crearBuscadorTabla();
    crearMapaTeterias();

    console.log(' Interactividad completa cargada');
});
