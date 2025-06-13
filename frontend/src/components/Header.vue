<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <Logo/>
        <SearchInput
            v-model="searchProducts"
            :debounceTime="1000"
            iconSrc="/icons/search.svg"
        />
        <ul class="header__action">
          <li v-for="item in actions" :key="item.id" class="header__icon" @click="item.action">
            <img :src="item.src" :alt="item.alt">
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import Logo from "@/components/Logo.vue";
import SearchInput from "@/components/UI/SearchInput.vue";

export default {
  name: 'Header',
  components: {SearchInput, Logo},
  data() {
    return {
      searchProducts: "",
      actions: [
        {id: 1, src: '/images/svg/user.svg', alt: 'signIn', action: 'login'},
        {id: 2, src: '/images/svg/cart.svg', alt: 'cart', action: 'cart'},
      ]
    };
  },
  watch: {
    searchProducts(newVal) {
      if (!newVal.trim()) {
        this.$store.dispatch('products/fetchProducts');
        return
      }
      this.fetchSearchProducts(newVal);
    }
  },
  methods: {
    fetchSearchProducts(searchTerm) {
      this.$store.dispatch('products/fetchSearchProducts', searchTerm);
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.1);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 5px 0;
  }

  &__action {
    width: max-content;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>