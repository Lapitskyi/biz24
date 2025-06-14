<template>
  <div class="container">
    <div class="load" v-if="loading">
      loading.....
    </div>
    <div v-else class="home">
      <div class="category">
        <div class="category__img" @click="isSidebarOpen = true">
          <img src="/images/svg/filter.svg" alt="img">
        </div>
      </div>
      <div v-if="!loading && !products.length">
        Nothing found
      </div>
      <div v-else class="products">
        <ProductCard
            v-for="card in products"
            :key="card.id"
            :product="card"
            @selectedProduct="selectProduct"
        />
      </div>

    </div>
    <FilterSidebar :visible="isSidebarOpen" @close="isSidebarOpen = false"/>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import router from "@/router/router";
import FilterSidebar from "@/components/FilterSidebar.vue";
import {mapState} from 'vuex';

export default {
  name: 'HomePage',
  components: {ProductCard, FilterSidebar},
  data() {
    return {
      filterQuery: {},
      selectedCategory: [],
      isSidebarOpen: false
    };
  },
  computed: {
    ...mapState('products', ['loading', 'filterProduct']),
    products() {
      return this.$store.getters['products/allProducts'];
    },
  },
  methods: {
    selectProduct(card) {
      this.$store.commit('products/setProductId', card);
      router.push(`/product/${card.id}`);
    },
  },
  created() {
    this.$store.dispatch('products/fetchProducts');
  },
}
</script>
<style scoped>

.home {
  margin-top: 32px;
  position: relative;
}

.load {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}

.category {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.category__img {
  width: 40px;
  height: 40px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: auto;

  img {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.products {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  margin-top: 32px;
}
</style>
