document.addEventListener('DOMContentLoaded', function () {
  const enlaces = document.querySelectorAll('.nav-link');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      enlaces.forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
    });
  });


function actualizarContador() {
    const fechaObjetivo = new Date('2025-07-24T16:00:00');
    const ahora = new Date();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        document.getElementById('contador').innerHTML = `
            <div class="countdown-box">
                <div class="h3 mb-0">0</div>
                <small>Días</small>
            </div>
            <div class="countdown-box">
                <div class="h3 mb-0">0</div>
                <small>Horas</small>
            </div>
            <div class="countdown-box">
                <div class="h3 mb-0">0</div>
                <small>Min</small>
            </div>
            <div class="countdown-box">
                <div class="h3 mb-0">0</div>
                <small>Seg</small>
            </div>
        `;
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById('contador').innerHTML = `
        <div class="countdown-box">
            <div class="h3 mb-0">${dias}</div>
            <small>Días</small>
        </div>
        <div class="countdown-box">
            <div class="h3 mb-0">${horas}</div>
            <small>Horas</small>
        </div>
        <div class="countdown-box">
            <div class="h3 mb-0">${minutos}</div>
            <small>Min</small>
        </div>
        <div class="countdown-box">
            <div class="h3 mb-0">${segundos}</div>
            <small>Seg</small>
        </div>
    `;
}
setInterval(actualizarContador, 1000);
actualizarContador();


  const imagenes = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
  ];

  const galeria = document.querySelector('#galeria .row');
  imagenes.forEach(src => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Foto de la galería';
    img.className = 'gallery-img';
    col.appendChild(img);
    galeria.appendChild(col);
  });
});


function esDispositivoMovil() {
    return window.innerWidth <= 768; 
}

function manejarNavegacionMovil() {
    const secciones = document.querySelectorAll('section');
    let indiceActual = 0;

    let contenedorNav = document.querySelector('.botones-nav-movil');
    if (!contenedorNav) {
        contenedorNav = document.createElement('div');
        contenedorNav.className = 'botones-nav-movil';
        document.body.appendChild(contenedorNav);

        const botonAnterior = document.createElement('button');
        botonAnterior.textContent = 'Anterior';
        botonAnterior.className = 'boton-nav';
        botonAnterior.disabled = true;
        contenedorNav.appendChild(botonAnterior);

        const botonSiguiente = document.createElement('button');
        botonSiguiente.textContent = 'Siguiente';
        botonSiguiente.className = 'boton-nav';
        contenedorNav.appendChild(botonSiguiente);

        function desplazarASeccion(indice) {
            secciones[indice].scrollIntoView({ behavior: 'smooth' });
            botonAnterior.disabled = indice === 0;
            botonSiguiente.disabled = indice === secciones.length - 1;
        }

        botonAnterior.addEventListener('click', () => {
            if (indiceActual > 0) {
                indiceActual--;
                desplazarASeccion(indiceActual);
            }
        });

        botonSiguiente.addEventListener('click', () => {
            if (indiceActual < secciones.length - 1) {
                indiceActual++;
                desplazarASeccion(indiceActual);
            }
        });
    }

    if (esDispositivoMovil()) {
        contenedorNav.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        contenedorNav.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', manejarNavegacionMovil);
manejarNavegacionMovil();
