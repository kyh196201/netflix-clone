<template>
  <transition name="modal">
    <div class="myModal-overlay">
      <div class="myModal-container">
        <div class="myModal__content">
          <div class="myModal__header">
            <slot name="header">default header</slot>
          </div>
          <div class="myModal__body">
            <slot name="body">default body</slot>
          </div>
          <div class="myModal__footer">
            <slot name="footer">default footer</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyModal",
  mounted() {
    document.querySelector("body").classList.add("scroll-lock");
  },
  destroyed() {
    document.querySelector("body").classList.remove("scroll-lock");
  }
};
</script>

<style>
.myModal-overlay {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 2.5rem 6rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100001;
  transition: opacity 0.3s ease;
}

.myModal-container {
  width: 100%;
  min-width: 500px;
  background-color: white;
  border-radius: 1%;
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  transition: all 0.5s ease;
}

.myModal__content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.myModal__body {
  flex: 1;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .myModal-container,
.modal-leave-active .myModal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>