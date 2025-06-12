<template>
  <div class="container">
    <div v-if="!productId">
      loading.....
    </div>
    <div v-else>
      <div class="product">
        <div class="product__picture">
          <div class="product__img">
            <img :src="productId.thumbnail || productId.images?.[0]  ||  ''" alt="img">
          </div>

          <div class="product__small-img">
            <img :src="productId.thumbnail || productId.images?.[0]  ||  ''" alt="img">
          </div>
        </div>

        <div class="product__info">
          <h3>{{ productId.title }}</h3>
          <p class="product__descriptions">{{ productId.description }}</p>
          <div class="product__raiting">
            <StarRating :rating="productId.rating"/>
            {{ productId.rating }}
          </div>
          <p class="product__price">&#x20AC {{ productId.price }}</p>

          <button
              class="product__btn"
          >Add Cart
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import StarRating from "@/components/UI/Raiting.vue";

export default {
  name: 'ProductPage',
  components: {StarRating},
  computed: {
    productId() {
      const product = this.$store.getters['products/getProductId'];
      if (!product) {
        this.fetchProductById()
      }
      return this.$store.getters['products/getProductId']
    }
  },
  methods: {
    fetchProductById() {
      const {id} = this.$route.params;
      this.$store.dispatch('products/fetchProductById', id)
    }
  }

}
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  gap: 30px;
  justify-content: center;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
  }

  &__descriptions {

  }

  &__raiting {
    display: flex;
    gap: 10px;
  }

  &__price {
    font-size: 24px;
    font-weight: 600;
  }

  &__picture {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__img {
    width: 100%;
    height: 100%;
    max-height: 450px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &__small-img {
    width: 100px;
    height: 100px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    img {
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  &__btn {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    background: #45c345;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #83ea83;
    }
  }
}
</style>