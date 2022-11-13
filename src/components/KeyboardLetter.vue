<script>
  export default {
    props: {
      letter: String
    }
  }
</script>
<template>
  <li class="keyboard-letter">{{ letter }}</li>
</template>