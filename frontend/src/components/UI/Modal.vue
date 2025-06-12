<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal__content">
      <button class="modal__close" @click="$emit('close')">×</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
}
</script>

<style lang="scss" scoped>
.modal  {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  &__content {
    background: #fff;
    max-width: 700px;
    max-height: 500px;
    width: 100%;
    padding: 24px;
    border-radius: 8px;
    overflow: auto;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
  }
}


</style>