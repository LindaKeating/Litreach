<template>
  <Transition name="fade">
    <div class="Modal modal fade" 
      :class="modalOpen ? 'Visible' : ''"
      :heading="heading"
      v-if="modalOpen">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">
                  <h4>{{ this.title }}</h4>
              </div>
              <button 
                class="btn btn-secondary"
                @click.prevent="close">x</button>
            </div>
            <div class="modal-body">
               <slot>
                
               </slot>
            </div>
          </div>
      </div>
    </div>
  </Transition> 
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      "modalOpen": Boolean,
      "heading": String,
      "currentModal": String,
    },
    computed: {
      title() {
        const expr = this.currentModal;
        switch (expr) {
          case 'Support':
            return 'Tacaíocht';
            break;
          case 'HowToPlay':
            return 'Treoracha';
            break;
          case 'GameDayEnded':
            return 'Torthaí';
            break;
          case 'GameRoundEnded':
            return 'Babhta thart';
            break;
          default:
            return '';
        }
      }
    },
    methods: {
      close() {
        this.$emit("modal-open-state", !this.modalOpen)
      }
    }
  };
</script>
<style scoped lang="scss">

@import "../assets/variables.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.Modal {


  
  &.Visible {
    display: block;
    background-color: $vt-c-white-mute;
  }
}

@media (prefers-color-scheme: dark) { 

  .Modal {
    .modal-content {
      background-color: $vt-c-black;
    }

    &.Visible {
      background-color: $vt-c-black;
    }
  }
}
</style>
