document.addEventListener('DOMContentLoaded', function () {
  const enlaces = document.querySelectorAll('.nav-link');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      enlaces.forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
    });
  });


  function updateCountdown() {
    const targetDate = new Date("2025-07-20T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;
  
    if (diff <= 0) {
      document.getElementById("contador").innerHTML = "¡Ya llegó el gran día!";
      return;
    }
  
    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  
    document.getElementById("days-top").textContent = days;
    document.getElementById("days-bottom").textContent = days;
    document.getElementById("hours-top").textContent = hours;
    document.getElementById("hours-bottom").textContent = hours;
    document.getElementById("minutes-top").textContent = minutes;
    document.getElementById("minutes-bottom").textContent = minutes;
    document.getElementById("seconds-top").textContent = seconds;
    document.getElementById("seconds-bottom").textContent = seconds;
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();


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

const audio = document.getElementById('miAudio');

  function playAudio() {
    audio.play().catch(() => {
      // Esperar interacción del usuario para intentar de nuevo
      function iniciar() {
        audio.play();
        window.removeEventListener('touchstart', iniciar);
        window.removeEventListener('click', iniciar);
      }
      window.addEventListener('touchstart', iniciar, { once: true });
      window.addEventListener('click', iniciar, { once: true });
    });
  }

  window.addEventListener('load', playAudio);