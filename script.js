document.addEventListener('DOMContentLoaded', function () {

  
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');

  
  const prefiereOscuro = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  
  let temaGuardado = null;
  try {
    temaGuardado = localStorage.getItem('tema');
  } catch (e) {
    temaGuardado = null;
  }

  
  const temaInicial = temaGuardado || (prefiereOscuro ? 'dark' : 'light');
  aplicarTema(temaInicial);

  function aplicarTema(tema) {
    if (tema === 'dark') {
      document.body.classList.add('dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      document.body.classList.remove('dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

 
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const esOscuro = document.body.classList.contains('dark');
      const nuevoTema = esOscuro ? 'light' : 'dark';
      aplicarTema(nuevoTema);
      try {
        localStorage.setItem('tema', nuevoTema);
      } catch (e) {
        
      }
    });
  }

  
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      let guardado = null;
      try { guardado = localStorage.getItem('tema'); } catch (err) {}
      if (!guardado) {
        aplicarTema(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ----------------------------------------------------------
     2. SCROLL SUAVE EN LOS ENLACES DEL NAVBAR
     ---------------------------------------------------------- */
  const enlaces = document.querySelectorAll('a[href^="#"]');
  enlaces.forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
      const destinoId = this.getAttribute('href');
      if (destinoId === '#' || destinoId.length < 2) return;

      const destino = document.querySelector(destinoId);
      if (destino) {
        e.preventDefault();
        const offset = 80; // altura del navbar fijo
        const top = destino.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });

        // Cerrar el menú móvil si está abierto
        const menu = document.getElementById('menuPrincipal');
        if (menu && menu.classList.contains('show')) {
          menu.classList.remove('show');
        }
      }
    });
  });

  /* ----------------------------------------------------------
     3. FORMULARIO DE CONTACTO (envío simulado)
     ---------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validación nativa de Bootstrap
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      alert('¡Mensaje enviado! 📧');
      form.reset();
      form.classList.remove('was-validated');
    });
  }

});