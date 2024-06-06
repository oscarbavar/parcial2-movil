import axios from 'axios';

// Función para generar una lista de IDs aleatorios para el juego
async function idsForGame() {
  let list = [];
  for (let i = 0; i < 4; i++) { 
    list[i] = Math.floor(Math.random() * 649) + 1;
  }
  return list;
}

export default {
  // Obtener una lista de Pokémon dentro de un rango específico
  async getPokemons(start, end) {
    let gottenPokemons = [];
    for (let i = start; i <= end; i++) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const itemPokemon = response.data;
        if (itemPokemon) {
          const addedPokemon = {
            id: itemPokemon.id,
            name: itemPokemon.name,
            image: itemPokemon.sprites.other.dream_world.front_default
          };
          gottenPokemons.push(addedPokemon);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return gottenPokemons;
  },

  // Obtener una lista de IDs aleatorios para el juego
  async getPokemonsForGame() {
    const list = await idsForGame(); 
    return list;
  },

  // Obtener detalles de un Pokémon por su nombre
  async getPokemonsDetail(name) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = response.data;
      const imageUrl = pokemonData.sprites.other.dream_world.front_default;
      return { ...pokemonData, image: imageUrl };
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Obtener la URL de la silueta de un Pokémon por su ID
  async getSilhouetteUrl(pokemonId) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemonData = response.data;
      const silhouetteUrl = pokemonData.sprites.other["official-artwork"].front_default;
      return silhouetteUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Obtener la URL de la imagen a color de un Pokémon por su ID
  async getColoredUrl(pokemonId) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemonData = response.data;
      const coloredUrl = pokemonData.sprites.other["official-artwork"].front_default;
      return coloredUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
