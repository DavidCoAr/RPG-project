// Crear un mazo de cartas
const palos = ["Corazones", "Diamantes", "Picas", "Tréboles"];
const valores = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jota", "Reina", "Rey"];

let mazo = []; // Array que almacenará las cartas del mazo
let jugadorCartas = []; // Array que almacenará las cartas del jugador
let dealerCartas = []; // Array que almacenará las cartas del dealer

function crearMazo() {
  for (let palo of palos) { // Iterar sobre los palos
    for (let valor of valores) { // Iterar sobre los valores
      let carta = { palo, valor }; // Crear un objeto carta con el palo y valor actual
      mazo.push(carta); // Agregar la carta al mazo
    }
  }
}

// Barajar el mazo de cartas
function barajarMazo() {
  for (let i = mazo.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [mazo[i], mazo[j]] = [mazo[j], mazo[i]]; // Intercambiar las posiciones de dos cartas al azar
  }
}

// Repartir las cartas iniciales
function repartirCartas() {
  jugadorCartas = [obtenerCarta(), obtenerCarta()]; // El jugador recibe dos cartas
  dealerCartas = [obtenerCarta(), obtenerCarta()]; // El dealer recibe dos cartas
}

// Obtener la siguiente carta del mazo
function obtenerCarta() {
  return mazo.pop(); // Remover y devolver la última carta del mazo
}

// Calcular el valor total de las cartas en una mano
function calcularValorMano(mano) {
  let valor = 0;
  let tieneAs = false;

  for (let carta of mano) {
    if (carta.valor === "As") {
      tieneAs = true; // Indicar que hay un As en la mano
    }
    valor += obtenerValorCarta(carta.valor); // Sumar el valor de la carta a la mano
  }

  if (tieneAs && valor + 10 <= 21) {
    valor += 10; // Si hay un As y sumarle 10 no lleva a pasarse de 21, se considera como 11
  }

  return valor; // Devolver el valor total de la mano
}

// Obtener el valor numérico de una carta
function obtenerValorCarta(valor) {
  if (valor === "As") {
    return 1; // El valor de un As es 1
  } else if (valor === "Jota" || valor === "Reina" || valor === "Rey") {
    return 10; // El valor de las cartas Jota, Reina y Rey es 10
  } else {
    return parseInt(valor); // El valor de las demás cartas se interpreta como su valor numérico
  }
}

// Juego principal
function jugarBlackjack() {
  crearMazo();
  barajarMazo();
  repartirCartas();

  while (true) {
    let puntosJugador = calcularValorMano(jugadorCartas); // Calcular los puntos del jugador
    let puntosDealer = calcularValorMano(dealerCartas); // Calcular los puntos del dealer

    console.log("Tus cartas: ");
    for (let carta of jugadorCartas) {
      console.log(`${carta.valor} de ${carta.palo}`); // Mostrar las cartas del jugador
    }
    console.log(`Total de puntos: ${puntosJugador}`); // Mostrar los puntos del jugador

    console.log("Carta visible del dealer: ");
    console.log(`${dealerCartas[0].valor} de ${dealerCartas[0].palo}`); // Mostrar la carta visible del dealer

    if (puntosJugador === 21) {
      console.log("¡Ganaste con Blackjack!"); // Si el jugador tiene 21 puntos, ha ganado con Blackjack
      break;
    }

    let respuesta = prompt("¿Quieres otra carta? (s/n)"); // Preguntar al jugador si desea otra carta

    if (respuesta.toLowerCase() === "s") {
      jugadorCartas.push(obtenerCarta()); // El jugador toma otra carta
      if (puntosJugador > 21) {
        console.log("Te pasaste de 21. ¡Perdiste!"); // Si el jugador se pasa de 21, ha perdido
        break;
      }
    } else {
      while (puntosDealer < 17) {
        dealerCartas.push(obtenerCarta()); // El dealer toma cartas hasta llegar a 17 puntos o más
        puntosDealer = calcularValorMano(dealerCartas); // Recalcular los puntos del dealer
      }

      console.log("Cartas del dealer: ");
      for (let carta of dealerCartas) {
        console.log(`${carta.valor} de ${carta.palo}`); // Mostrar las cartas del dealer
      }
      console.log(`Total de puntos del dealer: ${puntosDealer}`); // Mostrar los puntos del dealer

      if (puntosDealer > 21) {
        console.log("El dealer se pasó de 21. ¡Ganaste!"); // Si el dealer se pasa de 21, el jugador gana
      } else if (puntosJugador > puntosDealer) {
        console.log("¡Ganaste!"); // Si el jugador tiene más puntos que el dealer, el jugador gana
      } else if (puntosDealer > puntosJugador) {
        console.log("Perdiste."); // Si el dealer tiene más puntos que el jugador, el jugador pierde
      } else {
        console.log("Empate."); // Si ambos tienen la misma cantidad de puntos, hay empate
      }

      let otraPartida = prompt("¿Quieres jugar otra partida? (s/n)"); // Preguntar al jugador si quiere jugar otra partida

      if (otraPartida.toLowerCase() === "s") { // Comprobar si la respuesta es "s" (sí)
        jugadorCartas = []; // Reiniciar las cartas del jugador
        dealerCartas = []; // Reiniciar las cartas del dealer
        jugarBlackjack(); // Llamar a la función jugarBlackjack() para iniciar otra partida
        } else {
        break; // Si la respuesta no es "s" (no), salir del bucle while y terminar el juego
      }
    }
  }
}

// Ejecutar el juego
jugarBlackjack();
