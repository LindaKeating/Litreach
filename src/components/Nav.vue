<script>
  export default {
    props: {
      data: Object,
      definition: String,
      gameEnded: Boolean
    },
    emits: {
      setCurrentModal() { return true}
    }
  }
</script>

<template>
  <nav
    :class="[ data.darkMode ? 'bg-dark' : 'bg-light']"
    class="Nav navbar navbar-expand-lg">
      <div class="container-fluid">
        <span
          :class="[data.darkMode ? 'text-light' : 'text-dark']"
          class="navbar-brand mb-0 h1">Litreach
        </span>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button 
            @click="this.$emit('setCurrentModal', 'HowToPlay');"
            type="button" 
            class="Nav-MenuBtn btn btn-secondary">
            <font-awesome-icon icon="fa-solid fa-circle-e" />
          </button>
          <button
            @click="this.$emit('setCurrentModal', 'Support');" 
            type="button" 
            class="Nav-MenuBtn btn btn-secondary"><font-awesome-icon icon="fa-solid fa-envelope" /></button>
          <button 
            @click="this.$emit('setCurrentModal', 'GameDayEnded');"
            type="button" 
            class="Nav-MenuBtn btn btn-secondary"><font-awesome-icon icon="fa-solid fa-chart-line" /></button>
        </div>
      </div>
  </nav>
</template>
<style lang="scss" scoped>

  @import '../assets/variables.scss';
  .Nav {

    &-Definition {
      color: $stars-light-mode;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

  }

  @media (prefers-color-scheme: dark) {
    .Nav {
      &-MenuBtn {
      background-color: $button-background-light;
      border-color: $button-border-color;

     }
    }
  }
</style>