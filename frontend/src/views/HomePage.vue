<template>
  <div class="container">
    <div v-if="!products.length">
      loading.....
    </div>
    <div v-if="!products.length">
      Nothing found
    </div>
    <div v-else class="home">
      <div class="category">
        <div
            class="tabs"
            v-for="item in categoriesProduct"
            :key="item">
          {{ item }}
        </div>
        <div class="category__img" @click="isSidebarOpen = true">
          <img src="/images/svg/filter.svg" alt="img">
        </div>
      </div>
      <div class="products">
        <ProductCard
            v-for="card in products"
            :key="card.id"
            :product="card"
            @selectedProduct="selectProduct"
        />
      </div>
      <FilterSidebar :visible="isSidebarOpen" @close="isSidebarOpen = false"/>

    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import router from "@/router/router";
import FilterSidebar from "@/components/FilterSidebar.vue";

export default {
  name: 'HomePage',
  components: {ProductCard, FilterSidebar},
  data() {
    return {
      isSidebarOpen: false
    };
  },
  computed: {
    products() {
      return this.$store.getters['products/allProducts'];
    },
    categoriesProduct() {
      return this.$store.getters['products/allCategory'];
    }
  },
  methods: {
    selectProduct(card) {
      this.$store.commit('products/setProductId', card);
      router.push(`/product/${card.id}`);
    }
  },
  created() {
    this.$store.dispatch('products/fetchProducts');
  },
}
</script>
<style>

.home {
  margin-top: 32px;
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

.tabs {
  display: flex;
  padding: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.products {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  margin-top: 32px;
}
</style>
