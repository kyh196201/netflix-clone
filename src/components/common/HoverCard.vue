<template>
  <div class="hoverCard">
    <slot>
      Default slot
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.hoverCard {
  display: inline-block;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
}
</style>
