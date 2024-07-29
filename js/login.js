// Función para iniciar sesión
const loginUser = (event) => {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtiene los valores de email y password del formulario
  const email = document.querySelector('input[type="email"]').value.trim(); // Obtiene y limpia el valor del campo de email
  const password = document
    .querySelector('input[type="password"]')
    .value.trim(); // Obtiene y limpia el valor del campo de password

  // Obtiene los usuarios registrados del Local Storage
  let registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || []; // Si no hay usuarios, inicializa un array vacío

  // Busca un usuario con las mismas credenciales en el Local Storage
  const user = registeredUsers.find(
    (user) => user.email === email && user.password === password
  ); // Busca un usuario con el mismo email y password

  if (user) {
    // Si encuentra un usuario con las mismas credenciales
    let timerInterval;
    Swal.fire({
      // Muestra una alerta de bienvenida
      title: "BIENVENIDO USUARIO!", // Título de la alerta
      html: "Esto se cerrara en <b></b> milliseconds.", // Contenido HTML de la alerta
      timer: 2000, // Duración del timer de la alerta en milisegundos
      timerProgressBar: true, // Muestra la barra de progreso del timer
      didOpen: () => {
        Swal.showLoading(); // Muestra el loading en la alerta
        const timer = Swal.getPopup().querySelector("b"); // Obtiene el elemento <b> dentro de la alerta para mostrar el tiempo restante
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`; // Actualiza el contenido de <b> con el tiempo restante
        }, 100); // Intervalo de actualización cada 100 milisegundos
      },
      willClose: () => {
        clearInterval(timerInterval); // Limpia el intervalo cuando la alerta se cierra
      },
    }).then((result) => {
      // Ejecuta cuando la alerta se cierra
      if (result.dismiss === Swal.DismissReason.timer) {
        // Si la alerta se cerró por el timer
        console.log("Bienvenido espera que el tiempo termine"); // Mensaje en consola (puede ser ignorado)
      }
    });

    // Redirige a la página de la aplicación si el login es exitoso
    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5500/PAGINA/APLICACION.html"; // URL a la que se redirige después del login exitoso
    }, 2500); // Tiempo de espera antes de redirigir (para dar tiempo a que la alerta se muestre)
  } else {
    // Si no encuentra un usuario con las mismas credenciales
    Swal.fire({
      // Muestra una alerta de error
      title:
        "Mira un Nyan Cat y trae un mensaje que tu email o password es incorrecto perro asqueroso", // Título de la alerta
      width: 600, // Ancho de la alerta
      padding: "3em", // Padding de la alerta
      color: "#716add", // Color del texto de la alerta
      background: "#fff url(https://sweetalert2.github.io/images/trees.png)", // Fondo de la alerta con una imagen
      backdrop: ` // Fondo de la alerta
            rgba(0,0,123,0.4) // Color de fondo
            url("https://sweetalert2.github.io/images/nyan-cat.gif") // Imagen de fondo
            left top // Posición de la imagen
            no-repeat // No repetir la imagen
          `,
    });
  }

  // Resetea el formulario de login
  document.querySelector("form").reset(); // Limpia todos los campos del formulario
};

// Event listener para el evento de submit del formulario de login
document.querySelector("form").addEventListener("submit", loginUser); // Asocia la función loginUser al evento submit del formulario
