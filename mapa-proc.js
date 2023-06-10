// Variables de configuración
const mapWidth = 80;
const mapHeight = 50;
const tileSize = 64;
const tileFolder = 'images/tiles-map/';
const tileset = {
  ciudad: 'ciudad.png',
  desierto: 'desierto.png',
  lago: 'lago.png',
  mar: 'mar.png',
  poblado: 'poblado.png',
  praderaClara: 'pradera-clara.png',
  pradera: 'pradera.png'
};

// Función para cargar las imágenes
function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = path;
  });
}

// Clase Tile
class Tile {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
}

// Clase Mapa
class Mapa {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width * tileSize;
    this.canvas.height = height * tileSize;
    this.context = this.canvas.getContext('2d');
    this.tiles = [];
  }

  cargarTiles(tileset) {
    const tilePromises = Object.entries(tileset).map(([name, path]) =>
      loadImage(tileFolder + path).then(image => {
        this.tiles.push(new Tile(name, image));
      })
    );
    return Promise.all(tilePromises);
  }

  dibujar() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.tiles[y * this.width + x];
        this.context.drawImage(tile.image, x * this.tileSize, y * this.tileSize);
      }
    }
  }
}

// Generar el mapa
function generarMapa() {
  const mapa = new Mapa(mapWidth, mapHeight, tileSize);
  mapa.cargarTiles(tileset)
    .then(() => {
      // Lógica para generar el mapa aquí

      // 01-Inicializar el mapa con pradera en todos los tiles
      const mapData = new Array(mapHeight * mapWidth).fill('pradera');

      // 02-Generar el contorno del mapa con mar
      const minWidth = 3; // Ancho mínimo del borde de mar
      const maxWidth = 15; // Ancho máximo del borde de mar

      for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
          const borderWidthX = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
          const borderWidthY = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
          
          if (x < borderWidthX || x >= mapWidth - borderWidthX || y < borderWidthY || y >= mapHeight - borderWidthY) {
            mapData[y * mapWidth + x] = 'mar';
          }
        }
      }


      // 03-Generar el área central del mapa como desierto con forma de diamante
      const centerX = Math.floor(mapWidth / 2);
      const centerY = Math.floor(mapHeight / 2);
      const desertSize = 10; // Tamaño del desierto en cada dirección desde el centro

      // Generar el desierto en forma de diamante
      for (let y = centerY - desertSize; y <= centerY + desertSize; y++) {
        for (let x = centerX - desertSize; x <= centerX + desertSize; x++) {
          // Calcular la distancia en valor absoluto desde el centro en los ejes X e Y
          const distanceX = Math.abs(x - centerX);
          const distanceY = Math.abs(y - centerY);

          // Verificar si la posición se encuentra dentro del área de diamante
          if (distanceX + distanceY <= desertSize) {
            mapData[y * mapWidth + x] = 'desierto';
          }
        }
      }


      // 04-Generar ciudades y pueblos en posiciones aleatorias
      const numCities = 10;
      const numTowns = 10;
      const cityBuffer = 8; // Distancia mínima entre ciudades y pueblos
      const cityTile = 'ciudad';
      const townTile = 'poblado';

      // Función para verificar si una posición es válida y está lo suficientemente alejada de las posiciones existentes
      const isPositionValid = (x, y, positions, buffer) => {
        for (const pos of positions) {
          const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
          if (distance < buffer) {
            return false;
          }
        }
        return true;
      };

      const cityPositions = []; // Almacenar las posiciones de las ciudades
      const townPositions = []; // Almacenar las posiciones de los pueblos

      // Generar las ciudades
      for (let i = 0; i < numCities; i++) {
        let randomX, randomY;
        do {
          // Generar una posición aleatoria dentro del área permitida
          randomX = Math.floor(Math.random() * (mapWidth - 2 * cityBuffer) + cityBuffer);
          randomY = Math.floor(Math.random() * (mapHeight - 2 * cityBuffer) + cityBuffer);
          
          // Verificar si la posición generada es válida y está lo suficientemente alejada de las posiciones existentes
        } while (!isPositionValid(randomX, randomY, cityPositions, cityBuffer));
        
        // Agregar la posición de la ciudad al arreglo de posiciones
        cityPositions.push({ x: randomX, y: randomY });
        
        // Asignar el tile de ciudad a la posición en el mapa
        mapData[randomY * mapWidth + randomX] = cityTile;
      }

      // Generar los pueblos
      for (let i = 0; i < numTowns; i++) {
        let randomX, randomY;
        do {
          // Generar una posición aleatoria dentro del mapa
          randomX = Math.floor(Math.random() * mapWidth);
          randomY = Math.floor(Math.random() * mapHeight);
          
          // Verificar si la posición generada es válida y está lo suficientemente alejada de las posiciones existentes
        } while (!isPositionValid(randomX, randomY, [...cityPositions, ...townPositions], cityBuffer));
        
        // Agregar la posición del pueblo al arreglo de posiciones
        townPositions.push({ x: randomX, y: randomY });
        
        // Asignar el tile de pueblo a la posición en el mapa
        mapData[randomY * mapWidth + randomX] = townTile;
      }


      // 05-Generar lagos y praderas claras en posiciones aleatorias
      const numLakes = 5;
      const lakeTile = 'lago';
      const clearMeadowTile = 'praderaClara';

      for (let i = 0; i < numLakes; i++) {
        const randomX = Math.floor(Math.random() * (mapWidth - 1));
        const randomY = Math.floor(Math.random() * (mapHeight - 1));
        const lakeShape = Math.floor(Math.random() * 3); // 0: rectángulo, 1: cuadrado, 2: diamante

        if (lakeShape === 0) {
          // Generar lago en forma de rectángulo (2x3 a 2x5)
          const width = Math.floor(Math.random() * 2) + 2;
          const height = Math.floor(Math.random() * 3) + 3;

          for (let y = randomY; y < randomY + height; y++) {
            for (let x = randomX; x < randomX + width; x++) {
              mapData[y * mapWidth + x] = lakeTile;
            }
          }
        } else if (lakeShape === 1) {
          // Generar lago en forma de cuadrado (2x2 a 4x4)
          const size = Math.floor(Math.random() * 3) + 2;

          for (let y = randomY; y < randomY + size; y++) {
            for (let x = randomX; x < randomX + size; x++) {
              mapData[y * mapWidth + x] = lakeTile;
            }
          }
        } else {
          // Generar lago en forma de diamante (hasta 3 tiles)
          const size = Math.floor(Math.random() * 3) + 1;

          for (let y = randomY - size; y <= randomY + size; y++) {
            for (let x = randomX - size; x <= randomX + size; x++) {
              // Calcular la distancia en valor absoluto desde el centro en los ejes X e Y
              const distanceX = Math.abs(x - randomX);
              const distanceY = Math.abs(y - randomY);

              // Verificar si la posición se encuentra dentro del área de diamante
              if (distanceX + distanceY <= size) {
                mapData[y * mapWidth + x] = lakeTile;
              }
            }
          }
        }
      }

      // Generar praderas claras alrededor de los lagos
      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          if (mapData[y * mapWidth + x] === lakeTile) {
            if (x > 0 && mapData[y * mapWidth + x - 1] !== lakeTile) {
              mapData[y * mapWidth + x - 1] = clearMeadowTile;
            }
            if (x < mapWidth - 1 && mapData[y * mapWidth + x + 1] !== lakeTile) {
              mapData[y * mapWidth + x + 1] = clearMeadowTile;
            }
            if (y > 0 && mapData[(y - 1) * mapWidth + x] !== lakeTile) {
              mapData[(y - 1) * mapWidth + x] = clearMeadowTile;
            }
            if (y < mapHeight - 1 && mapData[(y + 1) * mapWidth + x] !== lakeTile) {
              mapData[(y + 1) * mapWidth + x] = clearMeadowTile;
            }
          }
        }
      }


      /*// Asignar los tiles restantes como praderas
      for (let i = 0; i < mapData.length; i++) {
        if (mapData[i] === '') {
          mapData[i] = 'pradera';
        }
      }*/

      // Dibujar el mapa en el canvas
      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          const tileName = mapData[y * mapWidth + x];
          const tile = mapa.tiles.find(t => t.name === tileName);
          mapa.context.drawImage(tile.image, x * tileSize, y * tileSize);
        }
      }

      // Mostrar el canvas en el HTML
      const container = document.getElementById('map-container');
      container.innerHTML = '';
      container.appendChild(mapa.canvas);
    })
    .catch(error => console.error('Error al cargar las imágenes:', error));
}

// Manejador de evento para el botón "Generar Mapa"
document.getElementById('generate-map-button').addEventListener('click', generarMapa);
