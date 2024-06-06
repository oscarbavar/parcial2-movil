<template>
  <div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3 class="text-primary">Listado de Pokemons</h3>
      </div>
    </div>
    <div class="row p-3 mt-3 mb-3 d-flex justify-content-center">
      <div v-for="pokemon in Pokemons" :key="pokemon.name" class="col-sm-10 mb-3">
            <img :src="pokemon.image" alt="">
            <h4>{{ pokemon.name }}</h4>
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
    };
  },
  async created() {
    await this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
      const startIndex = (this.page - 1) * this.pageSize + 1;
      const endIndex = startIndex + this.pageSize - 1;
      this.Pokemons = await PokemonServices.getPokemons(startIndex, endIndex > this.totalPokemons ? this.totalPokemons : endIndex);
    },
  }
};
</script>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>
