<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <label for=""> Name
          <input type="text">
        </label>
        <label for=""> Password
          <input type="text">
        </label>
        <button>Send</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &__inner {
    max-width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid black;
  }
}
</style>