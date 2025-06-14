<template>
  <div class="logo"  @click="goHome">
    <img src="/images/svg/logo.svg" alt="logo">
    <p>Store</p>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  width: 140px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:  pointer;

  img {
    display: block;
    width: 40px;
    height: 40px;
  }
  p{
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>