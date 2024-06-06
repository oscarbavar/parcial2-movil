<template>
  <div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3 class="text-primary">Listado de Pokemons</h3>
      </div>
    </div>
    <div class="row p-3 mt-3 mb-3 d-flex justify-content-center">
      <div v-for="pokemon in Pokemons" :key="pokemon.name" class="col-sm-10 mb-3">
        <div @click="watchDetail(pokemon.name)" class="card d-flex justify-content-center align-items-center">
          <div class="card-title">
            <img :src="pokemon.image" alt="">  <!--Imagen y nombre-->
            <h4>{{ pokemon.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <button @click="previousPage" :disabled="page === 1" class="btn btn-primary mr-2">Anterior</button>
        <button @click="nextPage" class="btn btn-primary">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';
import PokemonDetailView from '@/views/PokemonDetailView';

export default {
  name: 'PokemonsListView',
  data() {
    return {
      Pokemons: [],
      page: 1,
      pageSize: 10,
      totalPokemons: 90 
    };
  },
  async created() {
    await this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
      const startIndex = (this.page - 1) * this.pageSize + 1; //inicio y fin paginacion
      const endIndex = startIndex + this.pageSize - 1;
      this.Pokemons = await PokemonServices.getPokemons(startIndex, endIndex > this.totalPokemons ? this.totalPokemons : endIndex);
    },
    async watchDetail(name) {
      this.$router.push({
        name: 'PokemonDetail',
        params: {
          name: name
        }
      });
    },
    async nextPage() {  //incrementa la pag y actualiza la lista
      if ((this.page * this.pageSize) < this.totalPokemons) { 
        this.page++;
        await this.fetchPokemons();
      }
    },
    async previousPage() {  //decrementa
      if (this.page > 1) {
        this.page--;
        await this.fetchPokemons();
      }
    }
  }
};
</script>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>