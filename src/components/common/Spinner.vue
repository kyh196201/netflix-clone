<template>
  <div class="spinner-wrapper">
      <div class="spinner"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.spinner-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
}

/*
 use multiple transform in css
 : tps://stackoverflow.com/questions/10765755/how-to-apply-multiple-transforms-in-css */
.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: transparent;
    border: 5px solid #adb5bd;
    border-bottom-color: #212529;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: translate(-50%, -50%) rotate(0deg);
    } from {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

</style>