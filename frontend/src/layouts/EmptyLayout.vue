<template>
  <div class="layout">
    <main class="layout__content">
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: "EmptyLayout",
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__content {
  flex: 1;
  display: flex;
}
</style>
