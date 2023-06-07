// Clase Personaje que representa un personaje con estadísticas generadas aleatoriamente.
class Personaje {
  // Constructor de la clase Personaje.
    // Genera las estadísticas aleatorias del personaje.
  constructor() {
    // Nombre del personaje (generado entre 100 nombres)
    this.nombre = this.generarNombre();

    // Edad del personaje (valor entre 20 y 40).
    this.edad = this.generarValor(20, 40);

    // Fuerza del personaje (valor entre 1 y 20).
    this.fuerza = this.generarValor(1, 20);

    // Inteligencia del personaje (valor entre 1 y 20).
    this.inteligencia = this.generarValor(1, 20);

    // Vitalidad del personaje (valor entre 1 y 20).
    this.vitalidad = this.generarValor(1, 20);

    // Resistencia del personaje (valor entre 1 y 20).
    this.resistencia = this.generarValor(1, 20);

    // Velocidad del personaje (valor entre 1 y 20).
    this.velocidad = this.generarValor(1, 20);

    // Suerte del personaje (valor entre 1 y 20).
    this.suerte = this.generarValor(1, 20);

    // Vida del personaje (suma de resistencia y vitalidad).
    this.vida = this.resistencia + this.vitalidad;

    // Ataque del personaje (suma de fuerza e inteligencia).
    this.ataque = this.fuerza + this.inteligencia;

    // Defensa del personaje (suma de resistencia y velocidad).
    this.defensa = this.resistencia + this.velocidad;
  }

  // Genera un número entero aleatorio dentro de un rango dado.
    // @param {number} min - Valor mínimo del rango.
    // @param {number} max - Valor máximo del rango.
    // @returns {number} - Número entero aleatorio generado.
  generarValor(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Genera un nombre aleatorio para el personaje.
    // @returns {string} - Nombre aleatorio generado.
  generarNombre() {
    
    const nombres = [
      // Nombres alemanes
      'Lukas', 'Leon', 'Maximilian', 'Paul', 'Luca', 'Finn', 'Benjamin', 'Felix', 'David', 'Julian',
      'Elias', 'Noah', 'Alexander', 'Jan', 'Tim', 'Jonas', 'Nico', 'Simon', 'Moritz', 'Tom',
      'Emilia', 'Hannah', 'Lena', 'Lea', 'Sophia', 'Marie', 'Mia', 'Emma', 'Anna', 'Laura',
      'Lara', 'Clara', 'Maja', 'Frieda', 'Amelie', 'Emily', 'Sarah', 'Johanna', 'Charlotte', 'Paula',
      
      // Nombres italianos
      'Luca', 'Giulia', 'Alessandro', 'Sofia', 'Francesco', 'Martina', 'Leonardo', 'Chiara', 'Mattia', 'Emma',
      'Gabriele', 'Alice', 'Riccardo', 'Giorgia', 'Davide', 'Greta', 'Tommaso', 'Sara', 'Federico', 'Aurora',
      'Giacomo', 'Elisa', 'Samuele', 'Viola', 'Marco', 'Elena', 'Simone', 'Camilla', 'Lorenzo', 'Marta',
      
      // Nombres franceses
      'Gabriel', 'Louise', 'Jules', 'Camille', 'Adam', 'Lea', 'Louis', 'Manon', 'Paul', 'Chloe',
      'Arthur', 'Emma', 'Raphael', 'Alice', 'Lucas', 'Juliette', 'Hugo', 'Lena', 'Noe', 'Zoe',
      'Leo', 'Clara', 'Theo', 'Ines', 'Tom', 'Sarah', 'Nathan', 'Jade', 'Enzo', 'Maelys',
      
      // Nombres árabes
      'Mohammed', 'Layla', 'Ahmad', 'Zahra', 'Ali', 'Aisha', 'Omar', 'Fatima', 'Youssef', 'Maryam',
      'Hassan', 'Sara', 'Ibrahim', 'Noor', 'Khalid', 'Hana', 'Abdullah', 'Lina', 'Amir', 'Rania',
      'Nasir', 'Leila', 'Yusuf', 'Samira', 'Tariq', 'Jasmine', 'Said', 'Safia', 'Karim', 'Amina'
    ];
    
    
    return nombres[Math.floor(Math.random() * nombres.length)];
  }
}

// Crear una instancia de la clase Personaje
const personaje = new Personaje();

// Mostrar las estadísticas del personaje por consola (F5 para generar otra instancia)
console.log('Estadísticas del personaje:');
console.log('Nombre:', personaje.nombre);
console.log('Edad:', personaje.edad);
console.log('Vida:', personaje.vida);
console.log('Ataque:', personaje.ataque);
console.log('Defensa:', personaje.defensa);
console.log('Fuerza:', personaje.fuerza);
console.log('Inteligencia:', personaje.inteligencia);
console.log('Vitalidad:', personaje.vitalidad);
console.log('Resistencia:', personaje.resistencia);
console.log('Velocidad:', personaje.velocidad);
console.log('Suerte:', personaje.suerte);

// Obtener una referencia al botón en el HTML
const btnGenerarPersonaje = document.getElementById('btn-generar-personaje');

// Agregar un evento de clic al botón
btnGenerarPersonaje.addEventListener('click', () => {
  // Crear una nueva instancia de la clase Personaje
  const personaje = new Personaje();

  // Obtener una referencia al elemento del HTML donde se mostrarán las stats
  const personajeStats = document.getElementById('personaje-stats');

  // Construir el contenido HTML con las estadísticas del personaje
  const contenidoHTML = `
    <p>Nombre: ${personaje.nombre}</p>
    <p>Edad: ${personaje.edad}</p>
    <p>Vida: ${personaje.vida}</p>
    <p>Ataque: ${personaje.ataque}</p>
    <p>Defensa: ${personaje.defensa}</p>
    <p>Fuerza:${personaje.fuerza}</p>
    <p>Inteligencia: ${personaje.inteligencia}</p>
    <p>Vitalidad: ${personaje.vitalidad}</p>
    <p>Resistencia: ${personaje.resistencia}</p>
    <p>Velocidad: ${personaje.velocidad}</p>
    <p>Suerte: ${personaje.suerte}</p>
  `;

  // Asignar el contenido HTML al elemento de stats en el HTML
  personajeStats.innerHTML = contenidoHTML;
});
