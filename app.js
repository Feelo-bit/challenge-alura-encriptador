// Objeto que define las reglas de encriptación
const reglas = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };
  
  /**
   * Función genérica para encriptar o desencriptar texto basado en reglas.
   * 
   * @param {string} texto - El texto a procesar.
   * @param {object} reglas - Objeto que contiene las reglas de encriptación/desencriptación.
   * @param {boolean} esEncriptar - Define si la operación es encriptar (true) o desencriptar (false).
   * @returns {string} - El texto procesado (encriptado o desencriptado).
   */
  const procesarTexto = (texto, reglas, esEncriptar = true) => {
    const [keys, values] = [Object.keys(reglas), Object.values(reglas)];
    const [buscado, reemplazo] = esEncriptar ? [keys, values] : [values, keys];
    
    // Recorre cada clave del objeto y reemplaza en el texto según la operación
    return buscado.reduce((textoProcesado, caracter, indice) => 
      textoProcesado.replaceAll(caracter, reemplazo[indice]), texto);
  };
  
  /**
   * Función que encripta un texto utilizando reglas definidas.
   * 
   * @param {string} texto - El texto a encriptar.
   * @param {object} reglas - Objeto que contiene las reglas de encriptación.
   * @returns {string} - El texto encriptado.
   */
  const encriptar = (texto, reglas) => procesarTexto(texto, reglas, true);
  
  /**
   * Función que desencripta un texto encriptado utilizando reglas definidas.
   * 
   * @param {string} texto - El texto a desencriptar.
   * @param {object} reglas - Objeto que contiene las reglas de desencriptación.
   * @returns {string} - El texto desencriptado.
   */
  const desencriptar = (texto, reglas) => procesarTexto(texto, reglas, false);
  
  /**
   * Función que valida un texto para asegurar que solo contiene caracteres permitidos.
   * 
   * @param {string} texto - El texto a validar.
   * @returns {boolean} - true si el texto es válido, false en caso contrario.
   */
  const validarTexto = (texto) => /^[a-z\s.,0-9!]*$/.test(texto);
  
  /**
   * Función que copia un texto al portapapeles.
   * 
   * @param {string} texto - El texto a copiar.
   * @returns {boolean} - true si el texto fue copiado exitosamente, false en caso contrario.
   */
  const copiar = (texto) => {
    if (!texto) return false;
    
    // Crea un elemento input temporal para facilitar la copia al portapapeles
    const input = document.createElement("input");
    input.value = texto;
    document.body.appendChild(input);
    input.select();
    navigator.clipboard.writeText(input.value);
    document.body.removeChild(input);
    
    return true;
  };
  
  /**
   * Función para mostrar o esconder mensajes de error o elementos en la interfaz.
   * 
   * @param {HTMLElement} elemento - El elemento al que se le agregará o quitará la clase.
   * @param {string} clase - La clase CSS a agregar o quitar.
   * @param {boolean} agregar - true para agregar la clase, false para quitarla.
   */
  const mostrarMensaje = (elemento, clase, agregar = true) => {
    elemento.classList[agregar ? "add" : "remove"](clase);
  };
  
  /**
   * Función que maneja la lógica de encriptar o desencriptar el texto según el botón que se presiona.
   * 
   * @param {boolean} esEncriptar - true si se desea encriptar, false si se desea desencriptar.
   */
  const manejarEncriptado = (esEncriptar) => {
    const texto = document.getElementById("entrada").value;
    const not_found = document.getElementById("not_found");
    const found = document.getElementById("found");
    const resultado = document.getElementById("resultado");
    const botonCopiar = document.getElementById("boton-copiar");
  
    if (validarTexto(texto) && texto) {
      // Si el texto es válido, procesa y muestra el resultado encriptado o desencriptado
      mostrarMensaje(not_found, "not__found--off");
      mostrarMensaje(found, "found");
      resultado.innerHTML = esEncriptar ? encriptar(texto, reglas) : desencriptar(texto, reglas);
      mostrarMensaje(resultado, "not__found--off", false);
      mostrarMensaje(botonCopiar, "btn__copiar--oculto", false);
    } else {
      // Si el texto no es válido, muestra un mensaje de error
      alert("El texto contiene caracteres inválidos: solo se aceptan letras minúsculas, espacios, números del 0-9, puntos y comas");
      mostrarMensaje(not_found, "not__found--off", false);
      mostrarMensaje(resultado, "not__found--off");
      mostrarMensaje(found, "found", false);
      mostrarMensaje(botonCopiar, "btn__copiar--oculto");
    }
  };
  
  // Agrega eventos a los botones de encriptar y desencriptar
  document.getElementById("boton-encriptar").addEventListener("click", () => manejarEncriptado(true));
  document.getElementById("boton-desencriptar").addEventListener("click", () => manejarEncriptado(false));
  
  // Agrega un evento al botón de copiar
  document.getElementById("boton-copiar").addEventListener("click", () => {
    const texto = document.getElementById("resultado").textContent;
    const copiado = copiar(texto);
    alert(copiado ? "Texto copiado en el portapapeles" : "No hay texto para copiar");
  });
  
  // Muestra el año actual en el pie de página
  document.getElementById("fechaActual").innerHTML = new Date().getFullYear();
  