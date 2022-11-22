<script>
  export default {
    props: {
      data: Object
    }
  }
</script>

<template>
  <nav
    :class="[ data.darkMode ? 'bg-dark' : 'bg-light']"
    class="navbar">
      <div class="container-fluid">
        <span
          :class="[data.darkMode ? 'text-light' : 'text-dark']"
          class="navbar-brand mb-0 h1">Litreach
        </span>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary"><font-awesome-icon icon="fa-solid fa-circle-e" /></button>
          <button type="button" class="btn btn-secondary"><font-awesome-icon icon="fa-solid fa-envelope" /></button>
          <button type="button" class="btn btn-secondary"><font-awesome-icon icon="fa-solid fa-chart-line" /></button>
        </div>
      </div>
  </nav>
</template>
<style lang="scss" scoped>
</style>