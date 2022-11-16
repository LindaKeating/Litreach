<template>
  <Transition name="fade">
    <div class="Modal modal fade" 
      :class="modalOpen ? 'Visible' : ''"
      v-if="modalOpen">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">
                  Title Here
              </div>
              <button 
              @click.prevent="close">Close</button>
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
      "modalOpen": Boolean
    },
    methods: {
      close() {
        this.$emit("modal-open-state", !this.modalOpen)
      }
    }
  };
</script>
<style scoped lang="scss">

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
    background-color: black;
  }

}
</style>
