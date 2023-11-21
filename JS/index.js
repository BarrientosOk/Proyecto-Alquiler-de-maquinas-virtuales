let miSistema = new Sistema();

//Lecutra del html

//Crerar un usuarios
let usuarioPrueba1 = new Usuario(
  "David",
  "Barri",
  "usu1",
  "contra1",
  "1245124512311231",
  "123",
  "INSTANCE_ID_0",
  "Activo"
);
agregarUsuario(usuarioPrueba1);
let usuarioPrueba2 = new Usuario(
  "Rama",
  "Sua",
  "usu2",
  "contra2",
  "1245124512311231",
  "123",
  "INSTANCE_ID_1"
);
agregarUsuario(usuarioPrueba2);

function agregarUsuario(usuario) {
  miSistema.usuarios.push(usuario);
}

//crear administradores
let administrador1 = new Administrador("admin1", "clave1");
agregarAdministrador(administrador1);
let administrador2 = new Administrador("admin2", "clave2");
agregarAdministrador(administrador2);

function agregarAdministrador(administrador) {
  miSistema.administradores.push(administrador);
}

//agregar estado de equipos
function agregarEstadoEquipo(estadoDeEquio) {
  miSistema.estadoEquipos.push(estadoDeEquio);
}
let alquiler1 = new EstadoEquipo(1, `usu1`, "c7m", 0);
agregarEstadoEquipo(alquiler1);
let alquiler2 = new EstadoEquipo(2, `usu1`, "r7s", 2);
agregarEstadoEquipo(alquiler2);
let alquiler3 = new EstadoEquipo(3, `usu1`, "i7l", 4);
agregarEstadoEquipo(alquiler3);
let alquiler4 = new EstadoEquipo(4, `usu2`, "i7l", 0);
agregarEstadoEquipo(alquiler4);
let alquiler5 = new EstadoEquipo(5, `usu2`, "i7l", 3);
agregarEstadoEquipo(alquiler5);

//agregar tipos de instancias
let c7small = new TipoInstancia("c7s", "c7small", 5, 20, 2.5);
agregarTipoInstancias(c7small);
let c7medium = new TipoInstancia("c7m", "c7medium", 5, 30, 3.5);
agregarTipoInstancias(c7medium);
let c7large = new TipoInstancia("c7l", "c7large", 5, 50, 6);
agregarTipoInstancias(c7large);

let r7small = new TipoInstancia("r7s", "r7small", 5, 35, 4);
agregarTipoInstancias(r7small);
let r7medium = new TipoInstancia("r7m", "r7small", 5, 50, 6.5);
agregarTipoInstancias(r7medium);
let r7large = new TipoInstancia("r7l", "r7large", 5, 60, 7);
agregarTipoInstancias(r7large);

let i7medium = new TipoInstancia("i7m", "i7medium", 5, 30, 3.5);
agregarTipoInstancias(i7medium);
let i7large = new TipoInstancia("i7l", "i7large", 5, 50, 6.5);
agregarTipoInstancias(i7large);

function agregarTipoInstancias(tipoInstancia) {
  miSistema.tipoInstancia.push(tipoInstancia);
}

let botones = document.querySelectorAll(".boton");

for (let i = 0; i < botones.length; i++) {
  const boton = botones[i];
  boton.addEventListener("click", mostrarSeccion);
}

function mostrarSeccion() {
  let idBoton = this.getAttribute("id"); //"btnSeccionRegistrarseIngreso"
  let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4); //"seccionRegistrarseIngreso"
  cambiarSeccion(idSeccion);
}

cambiarSeccion("seccionIngreso");

function cambiarSeccion(idSeccionDestino) {
  ocultarSecciones();
  ocultarSeccionesAdministrador();
  document.querySelector("#" + idSeccionDestino).style.display = "block";
  if (idSeccionDestino === "seccionIngreso") {
    mostrarBotones();
  }
}

mostrarBotones();
function mostrarBotones(tipo) {
  let todosLosBotones = document.querySelectorAll(".boton");
  for (let i = 0; i < todosLosBotones.length; i++) {
    const boton = todosLosBotones[i];
    boton.style.display = "none";
  }

  let botonesMostrar = document.querySelectorAll("." + tipo);
  for (let i = 0; i < botonesMostrar.length; i++) {
    const botonM = botonesMostrar[i];
    botonM.style.display = "block";
  }
  //btnCerrarSeccion.style.display = "block";
}

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    const unaSeccion = secciones[i];
    unaSeccion.style.display = "none";
  }
}

function ocultarSeccionesAdministrador() {
  let seccionesAdmin = document.querySelectorAll(".administrador");
  for (let i = 0; i < seccionesAdmin.length; i++) {
    const unaSeccionesAdmin = seccionesAdmin[i];
    unaSeccionesAdmin.style.display = "none";
  }
}

document
  .querySelector("#btnRegistrarse")
  .addEventListener("click", registrarse);

function registrarse() {
  let nombre = document.querySelector("#txtNombre").value;
  let apellido = document.querySelector("#txtApellido").value;
  let usuario = document.querySelector("#txtNombreUsuario").value;
  let contraseña = document.querySelector("#txtContraseña").value;
  let tarjetaCredito = document.querySelector("#txtTarjetaCredito").value;
  let cvc = Number(document.querySelector("#txtCVC").value);
  let id = 2;

  document.querySelector("#pMensajesError1").innerHTML = ``;
  document.querySelector("#pMensajesErrorTarjeta").innerHTML = ``;

  if (
    validarNombreUsuario(nombre) &&
    validarNombreUsuarioRepetido(usuario) &&
    validarContraseña(contraseña) &&
    validarTarjetaCredito(tarjetaCredito) &&
    validarCVC(cvc)
  ) {
    let idusuario = "INSTANCE_ID_" + id++;
    let nuevoUsuario = new Usuario(
      nombre,
      apellido,
      usuario,
      contraseña,
      tarjetaCredito,
      cvc,
      id
    );
    agregarUsuario(nuevoUsuario);
  } else {
    document.querySelector(
      "#pMensajesError1"
    ).innerHTML += `¡ERROR! <br> REVISAR CAMPOS INGRESADOS`;
  }
}
console.log(miSistema.usuarios);

document
  .querySelector("#btnIngresar")
  .addEventListener("click", ingresarAlSistema);

function ingresarAlSistema() {
  let nombreUsuario = document.querySelector("#txtNombre1").value;
  let contraseña = document.querySelector("#txtContraseña1").value;
  let acceso = false;

  for (let i = 0; i < miSistema.usuarios.length; i++) {
    const objUsuario = miSistema.usuarios[i];
    if (
      (objUsuario.usuario === nombreUsuario) &
      (objUsuario.contraseña === contraseña)
    ) {
      if (objUsuario.status === "Pendiente") {
        document.querySelector("#pMensajesError2").innerHTML =
          "Usuario pendiente, espere el permiso de un administrador";
        acceso = true;
        break;
      } else if (objUsuario.status === "Bloqueado") {
        document.querySelector("#pMensajesError2").innerHTML =
          "Usuario bloqueado, hable con un administrador";
        acceso = true;
        break;
      } else {
        acceso = true;
        cambiarSeccion("seccionAlquilerMaquinasVirtuales");
        mostrarBotones("user");
        break;
      }
    }
  }

  for (let i = 0; i < miSistema.administradores.length; i++) {
    const objUsuario = miSistema.administradores[i];
    if (
      (objUsuario.usuarioAdmin === nombreUsuario) &
      (objUsuario.contraseñaAdmin === contraseña)
    ) {
      acceso = true;
      cambiarSeccion("seccionAdmin");
      mostrarBotones("admin");
      break;
    }
  }

  if (acceso === false) {
    document.querySelector("#pMensajesError2").innerHTML =
      "Usuario o contraseña incorrectas";
  }
}

document.querySelector("#btnCerrarSeccion").addEventListener("click", function () {cambiarSeccion("seccionIngreso");});

function validarNombreUsuario(usuario) {
  let nombreUsuarioValidado = true;

  for (let i = 0; i < usuario.length; i++) {
    const caracter = usuario.charAt(i);
    if (
      !(
        (caracter >= "0" && caracter <= "9") ||
        (caracter >= "A" && caracter <= "Z") ||
        (caracter >= "a" && caracter <= "z") ||
        caracter === "."
      )
    ) {
      nombreUsuarioValidado = false;
      break;
    }
  }
  return nombreUsuarioValidado;
}

function validarNombreUsuarioRepetido(usuario) {
  let usuarioRegistrado = true;
  for (let i = 0; i < miSistema.usuarios.length; i++) {
    const usu = miSistema.usuarios[i];
    if (usu.usuario === usuario) {
      usuarioRegistrado = false;
      document.querySelector(
        "#pMensajesError1"
      ).innerHTML = `¡ERROR! <br> USUARIO YA REGISTRADO`;
      break;
    }
  }
  return usuarioRegistrado;
}

function validarContraseña(contraseña) {
  if (contraseña.length < 5) {
    return false;
  }

  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;

  for (let i = 0; i < contraseña.length; i++) {
    const caracter = contraseña.charAt(i);
    if (caracter >= "a" && caracter <= "z") {
      tieneMinuscula = true;
    } else if (caracter >= "A" && caracter <= "Z") {
      tieneMayuscula = true;
    } else if (!isNaN(parseInt(caracter))) {
      tieneNumero = true;
    }
  }

  if (tieneMayuscula && tieneMinuscula && tieneNumero) {
    return true;
  } else {
    return false;
  }
}

function validarTarjetaCredito(tarjetaCredito) {
  let tarjetaCreditoValidada = true;
  for (let i = 0; i < tarjetaCredito.length; i++) {
    if (
      !(
        tarjetaCredito.charCodeAt(i) >= 48 &&
        tarjetaCredito.charCodeAt(i) <= 57 &&
        tarjetaCredito.length === 16
      )
    ) {
      tarjetaCreditoValidada = false;
      break;
    }
  }
  /*   let numeroInvertido = tarjetaCredito;
  let suma = 0;

  for (let i = 0; i < numeroInvertido.length; i++) {
    let digito = numeroInvertido.charAt(i) - "0";

    if (i % 2 === 1) {
      digito *= 2;
      if (digito > 9) {
        digito -= 9;
      }
    }

    suma += digito;
  }

  if (suma % 10 !== 0) {
    document.querySelector(
      "#pMensajesErrorTarjeta"
    ).innerHTML = `Tarjeta inválida`;
    tarjetaCreditoValidada = false;
  }
 */
  return tarjetaCreditoValidada;
}

function validarCVC(cvc) {
  let esValidoCVC;

  cvc = cvc.toString();

  if (!isNaN(Number(cvc)) && cvc.length === 3 && cvc >= 0 && cvc <= 999) {
    esValidoCVC = true;
  } else {
    esValidoCVC = false;
  }

  return esValidoCVC;
}

let encendidos = 0;
document
  .querySelector("#btnRentar")
  .addEventListener("click", cargarAlquilerEquipo);

function cargarAlquilerEquipo() {
  let selectElement = document.querySelector("#slcInstancias").value;
  let parrafoElement = document.querySelector("#pParrafo");
  let nombreUsuario = document.querySelector("#txtNombre1").value;

  let instanciaSeleccionada = null;

  for (let i = 0; i < miSistema.tipoInstancia.length; i++) {
    if (miSistema.tipoInstancia[i].id === selectElement) {
      instanciaSeleccionada = miSistema.tipoInstancia[i];
      break; // Termina el bucle una vez que se encuentra la instancia
    }
  }

  if (instanciaSeleccionada) {
    // Verificar si hay suficiente stock antes de alquilar
    if (instanciaSeleccionada.stock > 0) {
      let id = miSistema.estadoEquipos.length + 1;
      let cargarDatos = new EstadoEquipo(id, nombreUsuario, selectElement, 0);
      miSistema.estadoEquipos.push(cargarDatos);

      // Restar 1 al stock de la instancia correspondiente
      instanciaSeleccionada.stock--;

      parrafoElement.innerHTML = `Se ha asignado la instancia "${selectElement}" al usuario "${nombreUsuario}"`;
    } else {
      parrafoElement.innerHTML = `No hay stock disponible para la instancia "${selectElement}"`;
    }
  } else {
    parrafoElement.innerHTML =
      "Seleccione una instancia válida antes de rentar.";
  }
}

// Boton tabla de Instancais
document.querySelector("#txtNombre1").addEventListener("input", function () {
  // Llamar a la función generarTablaInstancias cada vez que se introduce un nombre
  generarTablaInstancias();
});

// Boton tabla de Instancais
document.querySelector("#btnGenerarTablaInstancias").addEventListener("click", generarTablaInstancias);

function generarTablaInstancias() {
  let nombreUsuario = document.querySelector("#txtNombre1").value;
  let cuerpoTabla = document.querySelector("#tblInstancias");cuerpoTabla.innerHTML = "";

    // Agregar un campo para filtrar por estado
    let filtroEstado = document.querySelector("#filtroEstado").value;
    console.log(miSistema)
    for (let i = 0; i < miSistema.estadoEquipos.length; i++) {
        let estadoEquipo = miSistema.estadoEquipos[i];
        if (nombreUsuario && estadoEquipo.usuario === nombreUsuario) {
        // Filtrar según el estado seleccionado
        if (filtroEstado === 'todos' || (filtroEstado === 'activas' && estadoEquipo.estado) || (filtroEstado === 'inactivas' && !estadoEquipo.estado)) {
            let instancia = null;

            for (let j = 0; j < miSistema.tipoInstancia.length; j++) {
                if (miSistema.tipoInstancia[j].id === estadoEquipo.instancia) {
                    instancia = miSistema.tipoInstancia[j];
                    break;
                }
            }
            let botonTexto = "encender"
            if(estadoEquipo.estado){
                botonTexto = "apagar"
            }
            let estadoEncendidoApagado = "Apagado"
            if(estadoEquipo.estado){
                estadoEncendidoApagado = "Encendido"
            }
            let fila = `<tr>
                            <td>${estadoEquipo.instancia}</td>
                            <td>${estadoEncendidoApagado}</td>
                            <td>${estadoEquipo.encendidos}</td>
                            <td><button id="btnEncenderOApagar_${estadoEquipo.id}">${botonTexto}</button></td>
                        </tr>`;
            cuerpoTabla.innerHTML += fila;
        }
    }
    }
}

// Boton de las instancias, aplicar la misma logica para el boton de abilitar usuario o eliminar usuario
document.querySelector("#tblInstancias").addEventListener("click", function (event) {
    if (event.target.id.startsWith("btnEncenderOApagar_")) {    //me da el id del elemento html que clickie
        let estadoEquipoid = event.target.id.replace("btnEncenderOApagar_", "");  // me quita del string el btnEncenderOApagar_ y me deja el numero de id
        botonPrenderApagar(estadoEquipoid);
    }
});

function botonPrenderApagar(estadoEquipoid) {
  console.log(estadoEquipoid, miSistema.estadoEquipos)
  for (let i = 0; i < miSistema.estadoEquipos.length; i++) {
      let estEquipo = miSistema.estadoEquipos[i];

      if (estEquipo.id === Number(estadoEquipoid)) {
          if (estEquipo.estado) {
              // Si está encendido, apágalo
              estEquipo.estado = false;
              //document.getElementById("btnEncenderOApagar_" + estEquipo.id).innerHTML = 'Encender';
          } else {
              // Si está apagado, enciéndelo y aumenta el contador
              estEquipo.estado = true;
              estEquipo.encendidos++;
              //document.getElementById("btnEncenderOApagar_" + estEquipo.id).innerHTML = 'Apagar';
          }

          // Actualizar la tabla
          generarTablaInstancias();
          break; // Terminar el bucle una vez que se ha encontrado la instancia
      }
  }
}
document.querySelector("#btnGenerarTablaCostoInstancias").addEventListener("click", generarTablaCostoInstancias);


function generarTablaCostoInstancias() {
  let cuerpoTablaCosto = document.querySelector("#tblCostoInstancias");
  cuerpoTablaCosto.innerHTML = "";

  // creo un objeto para saber que tengo que meterle a la tabla de costos  PREGUNTAR SI ES LA MEJOR OPCION O HAY MAS FACILES CON MENOS CODIGO
  let costosPorTipo = {};

  for (let i = 0; i < miSistema.estadoEquipos.length; i++) {
    let estadoEquipo = miSistema.estadoEquipos[i];
    let tipoInstancia = null;

    // busco el tipo de instancia en miSistema.tipoInstancia
    for (let j = 0; j < miSistema.tipoInstancia.length; j++) {
      if (miSistema.tipoInstancia[j].id === estadoEquipo.instancia) {
        tipoInstancia = miSistema.tipoInstancia[j];
        break;
      }
    }

    // Verificamos si ya existe y si no vamos al else y actualizar, asi me quedan los datos nuevos areglados
    if (!costosPorTipo[estadoEquipo.instancia]) {
      costosPorTipo[estadoEquipo.instancia] = {
        costoPorEncendido: tipoInstancia.costoPorEncendido,
        vecesEncendido: estadoEquipo.encendidos,
        costoAlquiler: tipoInstancia.precioAlquiler,
        costoTotal: 0,
      };
    } else {
      // si ya esxiste la actualizo
      costosPorTipo[estadoEquipo.instancia].vecesEncendido +=
        estadoEquipo.encendidos;
    }
  }

  // calculo costo total y genero tablaaaa
  for (let tipo in costosPorTipo) {
    let costoPorTipo = costosPorTipo[tipo];
    costoPorTipo.costoTotal =
      costoPorTipo.costoPorEncendido * costoPorTipo.vecesEncendido +
      costoPorTipo.costoAlquiler;

    let fila = `<tr>
                        <td>${tipo} (Total)</td>
                        <td>${costoPorTipo.costoPorEncendido}</td>
                        <td>${costoPorTipo.vecesEncendido}</td>
                        <td>${costoPorTipo.costoAlquiler}</td>
                        <td>${costoPorTipo.costoTotal}</td>
                    </tr>`;

    cuerpoTablaCosto.innerHTML += fila;
  }
}

//EMPIEZA SECCION ADMIN

const userList = document.querySelector("#userList");
const usuario = miSistema.usuarios;

function renderUserList() {
  userList.innerHTML = "";
  usuario.forEach((usuario) => {
    const listItem = document.createElement("li");
    listItem.classList.add("usuario");
    listItem.textContent = `${usuario.nombre} - Estado: ${usuario.status}`;

    if (usuario.status === "Activo") {
      listItem.classList.add("Activo");
    } else if (usuario.status === "Bloqueado") {
      listItem.classList.add("Bloqueado");
    } else if (usuario.status === "Pendiente") {
      listItem.classList.add("Pendiente");
    }

    const activateButton = document.createElement("button");
    activateButton.textContent = "Activar";
    if (usuario.status === "Activo") {
      activateButton.style.backgroundColor = "#cccccc";
      activateButton.style.color = "#666666";
      activateButton.style.cursor = "not-allowed";
      activateButton.disabled = true;
    } else {
      activateButton.style.cursor = "pointer";
    }
    activateButton.addEventListener("click", () => activateUser(usuario.id));

    const blockButton = document.createElement("button");
    blockButton.textContent = "Bloquear";
    if (usuario.status !== "Activo") {
      blockButton.style.backgroundColor = "#cccccc";
      blockButton.style.color = "#666666";
      blockButton.style.cursor = "not-allowed";
      blockButton.disabled = true;
    } else {
      blockButton.style.cursor = "pointer";
    }
    blockButton.addEventListener("click", () => blockUser(usuario.id));

    listItem.appendChild(activateButton);
    listItem.appendChild(blockButton);
    userList.appendChild(listItem);
  });
}

function activateUser(idUsuario) {
  const userIndex = usuario.findIndex((usuario) => usuario.id === idUsuario);
  if (userIndex !== -1) {
    usuario[userIndex].status = "Activo";
    renderUserList();
  }
}

function blockUser(idUsuario) {
  const userIndex = usuario.findIndex((u) => u.id === idUsuario);
  if (userIndex !== -1 && usuario[userIndex].status === "Activo") {
    usuario[userIndex].status = "Bloqueado";
    renderUserList();
  }
}

renderUserList();

document
  .querySelector("#btnSeccionInforme")
  .addEventListener("click", generarTablaInformeAdmin);

const alquileres = miSistema.estadoEquipos;
function contarAlquileresPorInstancia(id) {
  i = 0;
  alquileres.forEach((alquiler) => {
    if (id === alquiler.instancia) {
      i += 1;
    }
  });
  return i;
}

function contarAlquileresEncendidos(id) {
  i = 0;
  alquileres.forEach((alquiler) => {
    if (id === alquiler.instancia && alquiler.encendidos != 0) {
      i += alquiler.encendidos;
    }
  });
  return i;
}

function disminuirStock(id) {
  let stockElement = document.getElementById(`stock-${id}`);
  let stockActual = parseInt(stockElement.textContent, 10);

  if (stockActual > contarAlquileresPorInstancia(id)) {
    stockActual--;
    stockElement.textContent = stockActual;
  }
}

function generarTablaInformeAdmin() {
  let cuerpoTablaInforme = document.querySelector("#tblInformeAdmin");
  cuerpoTablaInforme.innerHTML = "";
  total = 0;
  miSistema.tipoInstancia.forEach((Maquina) => {
    let fila = `<tr>
                        <td>${Maquina.nombre}</td>
                        <td>
                        <span id="stock-${Maquina.id}">${Maquina.stock}</span>
                        <button onclick="disminuirStock('${
                          Maquina.id
                        }')";">Disminuir</button>
                        </td>
                        <td>${contarAlquileresPorInstancia(Maquina.id)}</td>
                        <td>${contarAlquileresEncendidos(Maquina.id)}</td>
                        <td>$${Maquina.precioAlquiler}</td>
                        <td>$${
                          Maquina.precioAlquiler + Maquina.costoPorEncendido
                        }</td>
                        <td>$${
                          (Maquina.precioAlquiler + Maquina.costoPorEncendido) *
                            contarAlquileresEncendidos(Maquina.id) +
                          Maquina.precioAlquiler *
                            (contarAlquileresPorInstancia(Maquina.id) -
                              contarAlquileresEncendidos(Maquina.id))
                        }</td>
                    </tr>`;
    total +=
      (Maquina.precioAlquiler + Maquina.costoPorEncendido) *
      contarAlquileresPorInstancia(Maquina.id);
    cuerpoTablaInforme.innerHTML += fila;
  });

  document.querySelector(
    "#pIngresosTotales"
  ).innerHTML = `Ingresos totales de todas las máquinas: $${total}`;
}
