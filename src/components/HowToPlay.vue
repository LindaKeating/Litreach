<template>
  <div class="HowToPlay"> 
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-1" />
    <p class="col-11">Listen to the word in any of all the three dialects</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-2" />
    <p class="col-11">Try to write what you hear</p>
    <font-awesome-icon
      :class="'col-1'"
      icon="fa-solid fa-circle-3" />
    <p class="col-11">You will get 5 lives to spell the word right.  With each attempt any letters that are in the correct position in the word will be marked as correct</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-4" />
    <p class="col-11">There will be 5 different spelling challenges to play each day</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-5" />
    <p class="col-11">When the days game is over your game will be saved to your statistics</p>
  </div>
</template>
<style lang="scss" scoped>
  .HowToPlay {
    display: flex;
    flex-wrap: wrap;

    svg {
      padding-top: .5rem;
    }
  }
</style>