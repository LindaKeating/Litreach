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
          class="navbar-brand mb-0 h1">Litreach</span>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarToggleExternalContent" 
          aria-controls="navbarToggleExternalContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span
            :class="[data.darkMode ? 'text-light' : 'text-dark']" 
            class="navbar-toggler-icon"></span>
        </button>
      </div>
  </nav>
</template>