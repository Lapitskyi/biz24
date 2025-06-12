<template>
  <div class="layout">
    <Header />
    <main class="layout__content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "PublicLayout",
  components: {
    Header
  }
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
