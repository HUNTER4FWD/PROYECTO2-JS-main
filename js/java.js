document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const eventoForm = document.getElementById("evento-form"); // Formulario para agregar eventos
  const tareaForm = document.getElementById("tarea-form"); // Formulario para agregar tareas
  const listaEventos = document.getElementById("lista-eventos"); // Lista de eventos
  const listaTareas = document.getElementById("lista-tareas"); // Lista de tareas
  const modalEditarEvento = document.getElementById("modal-editar-evento"); // Modal para editar eventos
  const modalEditarTarea = document.getElementById("modal-editar-tarea"); // Modal para editar tareas
  const closeBtns = document.querySelectorAll(".close-btn"); // Botones para cerrar los modales

  let eventoEditIndex = null; // Índice del evento en edición
  let tareaEditIndex = null; // Índice de la tarea en edición

  // Eventos
  eventoForm.addEventListener("submit", agregarEvento); // Agregar evento al enviar formulario
  tareaForm.addEventListener("submit", agregarTarea); // Agregar tarea al enviar formulario
  listaEventos.addEventListener("click", manejarEvento); // Manejar clics en la lista de eventos (editar/eliminar)
  listaTareas.addEventListener("click", manejarTarea); // Manejar clics en la lista de tareas (editar/eliminar)

  closeBtns.forEach((btn) => btn.addEventListener("click", cerrarModal)); // Cerrar modal al hacer clic en el botón de cierre

  document
    .getElementById("editar-evento-form")
    .addEventListener("submit", guardarCambiosEvento); // Guardar cambios de evento al enviar formulario
  document
    .getElementById("editar-tarea-form")
    .addEventListener("submit", guardarCambiosTarea); // Guardar cambios de tarea al enviar formulario

  // Cargar del LS
  cargarEventos(); // Cargar eventos desde Local Storage al cargar la página
  cargarTareas(); // Cargar tareas desde Local Storage al cargar la página

  // Funciones
  function agregarEvento(e) {
    e.preventDefault(); // Prevenir envío de formulario
    const titulo = document.getElementById("evento-titulo").value; // Obtener título del evento
    const fecha = document.getElementById("evento-fecha").value; // Obtener fecha del evento

    // Verificar si el evento ya existe
    const eventos = obtenerEventos(); // Obtener eventos del Local Storage
    const eventoExistente = eventos.find((evento) => evento.titulo === titulo);

    if (eventoExistente) {
      Swal.fire({
        // Muestra una alerta de error
        title:
          "Hoy no pudo venir Nian Cat por el agua pero dijo que estas bien pendejo no vez que ya la creaste", // Título de la alerta
        width: 600, // Ancho de la alerta
        padding: "3em", // Padding de la alerta
        color: "red", // Color del texto de la alerta
        background: "#fff url(https://sweetalert2.github.io/images/trees.png)", // Fondo de la alerta con una imagen
        backdrop: ` // Fondo de la alerta
              rgba(0,0,123,0.4) // Color de fondo
              url("https://sweetalert2.github.io/images/nyan-cat.gif") // Imagen de fondo
              left top // Posición de la imagen
              no-repeat // No repetir la imagen
            `,
      });
      return;
    }

    const evento = { titulo, fecha }; // Crear objeto evento

    eventos.push(evento); // Agregar nuevo evento
    localStorage.setItem("eventos", JSON.stringify(eventos)); // Guardar eventos actualizados en Local Storage

    mostrarEvento(evento, eventos.length - 1); // Mostrar nuevo evento en la lista
    eventoForm.reset(); // Resetear formulario
  }

  function agregarTarea(e) {
    e.preventDefault(); // Prevenir envío de formulario
    const titulo = document.getElementById("tarea-titulo").value; // Obtener título de la tarea
    const prioridad = document.getElementById("tarea-prioridad").value; // Obtener prioridad de la tarea

    // Verificar si la tarea ya existe
    const tareas = obtenerTareas(); // Obtener tareas del Local Storage
    const tareaExistente = tareas.find((tarea) => tarea.titulo === titulo);

    if (tareaExistente) {
      // Si no encuentra un usuario con las mismas credenciales
      Swal.fire({
        // Muestra una alerta de error
        title:
          "Hoy no pudo venir Nian Cat por el agua pero dijo que estas bien pendejo no vez que ya la creaste", // Título de la alerta
        width: 600, // Ancho de la alerta
        padding: "3em", // Padding de la alerta
        color: "red", // Color del texto de la alerta
        background: "#fff url(https://sweetalert2.github.io/images/trees.png)", // Fondo de la alerta con una imagen
        backdrop: ` // Fondo de la alerta
              rgba(0,0,123,0.4) // Color de fondo
              url("https://sweetalert2.github.io/images/nyan-cat.gif") // Imagen de fondo
              left top // Posición de la imagen
              no-repeat // No repetir la imagen
            `,
      });
      return;
    }

    const tarea = { titulo, prioridad }; // Crear objeto tarea

    tareas.push(tarea); // Agregar nueva tarea
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardar tareas actualizadas en Local Storage

    mostrarTarea(tarea, tareas.length - 1); // Mostrar nueva tarea en la lista
    tareaForm.reset(); // Resetear formulario
  }

  function manejarEvento(e) {
    const index = e.target.dataset.index; // Obtener índice del evento
    if (e.target.classList.contains("delete-btn")) {
      // Si se hace clic en el botón de eliminar
      eliminarEvento(index); // Eliminar evento
    } else if (e.target.classList.contains("edit-btn")) {
      // Si se hace clic en el botón de editar
      abrirModalEditarEvento(index); // Abrir modal para editar evento
    }
  }

  function manejarTarea(e) {
    const index = e.target.dataset.index; // Obtener índice de la tarea
    if (e.target.classList.contains("delete-btn")) {
      // Si se hace clic en el botón de eliminar
      eliminarTarea(index); // Eliminar tarea
    } else if (e.target.classList.contains("edit-btn")) {
      // Si se hace clic en el botón de editar
      abrirModalEditarTarea(index); // Abrir modal para editar tarea
    }
  }

  function mostrarEvento(evento, index) {
    const li = document.createElement("li"); // Crear elemento de lista
    li.innerHTML = `
      ${evento.titulo} - ${evento.fecha} 
      <button class="edit-btn" data-index="${index}">Editar</button>
      <button class="delete-btn" data-index="${index}">Eliminar</button>
    `;
    listaEventos.appendChild(li); // Agregar evento a la lista de eventos
  }

  function mostrarTarea(tarea, index) {
    const li = document.createElement("li"); // Crear elemento de lista
    li.innerHTML = `
      ${tarea.titulo} - Prioridad: ${tarea.prioridad} 
      <button class="edit-btn" data-index="${index}">Editar</button>
      <button class="delete-btn" data-index="${index}">Eliminar</button>
    `;
    listaTareas.appendChild(li); // Agregar tarea a la lista de tareas
  }

  function cargarEventos() {
    const eventos = obtenerEventos(); // Obtener eventos del Local Storage
    eventos.forEach((evento, index) => mostrarEvento(evento, index)); // Mostrar cada evento en la lista
  }

  function cargarTareas() {
    const tareas = obtenerTareas(); // Obtener tareas del Local Storage
    tareas.forEach((tarea, index) => mostrarTarea(tarea, index)); // Mostrar cada tarea en la lista
  }

  function obtenerEventos() {
    const eventos = localStorage.getItem("eventos"); // Obtener eventos del Local Storage
    return eventos ? JSON.parse(eventos) : []; // Retornar eventos parseados o un array vacío
  }

  function obtenerTareas() {
    const tareas = localStorage.getItem("tareas"); // Obtener tareas del Local Storage
    return tareas ? JSON.parse(tareas) : []; // Retornar tareas parseadas o un array vacío
  }

  function eliminarEvento(index) {
    const eventos = obtenerEventos(); // Obtener eventos del Local Storage
    eventos.splice(index, 1); // Eliminar evento por índice
    localStorage.setItem("eventos", JSON.stringify(eventos)); // Guardar eventos actualizados en Local Storage
    listaEventos.innerHTML = ""; // Limpiar lista de eventos
    cargarEventos(); // Volver a cargar eventos
  }

  function eliminarTarea(index) {
    const tareas = obtenerTareas(); // Obtener tareas del Local Storage
    tareas.splice(index, 1); // Eliminar tarea por índice
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardar tareas actualizadas en Local Storage
    listaTareas.innerHTML = ""; // Limpiar lista de tareas
    cargarTareas(); // Volver a cargar tareas
  }

  function abrirModalEditarEvento(index) {
    const eventos = obtenerEventos(); // Obtener eventos del Local Storage
    const evento = eventos[index]; // Obtener evento por índice
    eventoEditIndex = index; // Guardar índice del evento en edición

    document.getElementById("editar-evento-titulo").value = evento.titulo; // Asignar título del evento al formulario de edición
    document.getElementById("editar-evento-fecha").value = evento.fecha; // Asignar fecha del evento al formulario de edición
    modalEditarEvento.style.display = "block"; // Mostrar modal de edición de eventos
  }

  function abrirModalEditarTarea(index) {
    const tareas = obtenerTareas(); // Obtener tareas del Local Storage
    const tarea = tareas[index]; // Obtener tarea por índice
    tareaEditIndex = index; // Guardar índice de la tarea en edición

    document.getElementById("editar-tarea-titulo").value = tarea.titulo; // Asignar título de la tarea al formulario de edición
    document.getElementById("editar-tarea-prioridad").value = tarea.prioridad; // Asignar prioridad de la tarea al formulario de edición
    modalEditarTarea.style.display = "block"; // Mostrar modal de edición de tareas
  }

  function cerrarModal() {
    modalEditarEvento.style.display = "none"; // Cerrar modal de edición de eventos
    modalEditarTarea.style.display = "none"; // Cerrar modal de edición de tareas
  }

  function guardarCambiosEvento(e) {
    e.preventDefault(); // Prevenir envío de formulario
    const titulo = document.getElementById("editar-evento-titulo").value; // Obtener título del evento del formulario de edición
    const fecha = document.getElementById("editar-evento-fecha").value; // Obtener fecha del evento del formulario de edición

    const eventos = obtenerEventos(); // Obtener eventos del Local Storage
    eventos[eventoEditIndex] = { titulo, fecha }; // Actualizar evento en el índice correspondiente
    localStorage.setItem("eventos", JSON.stringify(eventos)); // Guardar eventos actualizados en Local Storage

    listaEventos.innerHTML = ""; // Limpiar lista de eventos
    cargarEventos(); // Volver a cargar eventos
    cerrarModal(); // Cerrar modal de edición
  }

  function guardarCambiosTarea(e) {
    e.preventDefault(); // Prevenir envío de formulario
    const titulo = document.getElementById("editar-tarea-titulo").value; // Obtener título de la tarea del formulario de edición
    const prioridad = document.getElementById("editar-tarea-prioridad").value; // Obtener prioridad de la tarea del formulario de edición

    const tareas = obtenerTareas(); // Obtener tareas del Local Storage
    tareas[tareaEditIndex] = { titulo, prioridad }; // Actualizar tarea en el índice correspondiente
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardar tareas actualizadas en Local Storage

    listaTareas.innerHTML = ""; // Limpiar lista de tareas
    cargarTareas(); // Volver a cargar tareas
    cerrarModal(); // Cerrar modal de edición
  }
});
