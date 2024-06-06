<template>
  <div>
    <div v-if="loading" class="pre-loader">
      <p>Cargando...</p>
    </div>
    <div v-else>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <h3 class="text-primary">¿Quién es el Pokémon?</h3>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import PokemonServices from '@/services/PokemonServices';

</script>
  
<style>
</style>
