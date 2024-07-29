const saveRegistration = () => {
  // Obtener y limpiar los valores de los campos del formulario
  const fullName = document.getElementById("fullName").value.trim(); // Obtener el valor del campo 'fullName' y eliminar espacios en blanco
  const userName = document.getElementById("userName").value.trim(); // Obtener el valor del campo 'userName' y eliminar espacios en blanco
  const email = document.getElementById("email").value.trim(); // Obtener el valor del campo 'email' y eliminar espacios en blanco
  const phone = document.getElementById("phone").value.trim(); // Obtener el valor del campo 'phone' y eliminar espacios en blanco
  const password = document.getElementById("password").value.trim(); // Obtener el valor del campo 'password' y eliminar espacios en blanco
  const password2 = document.getElementById("password2").value.trim(); // Obtener el valor del campo 'password2' y eliminar espacios en blanco

  // Verificar si las contraseñas coinciden
  if (password !== password2) {
    // Comparar las contraseñas ingresadas
    alert("Las contraseñas no coinciden"); // Mostrar alerta si las contraseñas no coinciden
    return; // Terminar la función si las contraseñas no coinciden
  }

  // Obtener los registros actuales del Local Storage
  let registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || []; // Obtener usuarios registrados desde Local Storage o inicializar un array vacío si no hay registros

  // Verificar si el nombre de usuario o email ya están registrados
  const userExists = registeredUsers.some(
    (user) => user.userName === userName || user.email === email
  ); // Verificar si ya existe un usuario con el mismo nombre de usuario o email
  if (userExists) {
    // Si el usuario ya existe
    Swal.fire({
      // Mostrar alerta usando Swal
      icon: "error", // Tipo de icono de alerta
      title: "Lo siento", // Título de la alerta
      text: "Email o Usuario ya registrado!", // Texto de la alerta
      footer:
        '<a href="http://127.0.0.1:5500/LOGIN/LOGIN.html">¿Inicia sesión?</a>', // Pie de la alerta con un enlace a la página de inicio de sesión
    });
    return; // Terminar la función si el usuario ya existe
  }

  // Crear un objeto usuario con los datos del formulario
  const user = {
    fullName, // Asignar valor de 'fullName'
    userName, // Asignar valor de 'userName'
    email, // Asignar valor de 'email'
    phone, // Asignar valor de 'phone'
    password, // Asignar valor de 'password'
  };

  // Agregar el nuevo usuario al array de usuarios registrados
  registeredUsers.push(user); // Agregar el objeto 'user' al array 'registeredUsers'

  // Guardar el array actualizado en el Local Storage
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers)); // Convertir el array en JSON y guardarlo en Local Storage

  Swal.fire({
    // Mostrar alerta de registro exitoso usando Swal
    position: "center", // Posición de la alerta
    icon: "success", // Tipo de icono de alerta
    title: "🙂 REGISTRO EXITOSO 🙂", // Título de la alerta
    showConfirmButton: false, // No mostrar botón de confirmación
    timer: 1500, // Duración de la alerta en milisegundos
  });

  // Resetear el formulario
  document.getElementById("formulario").reset(); // Resetear el formulario para limpiar todos los campos
};
