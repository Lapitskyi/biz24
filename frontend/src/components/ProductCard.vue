<template>
  <div class="card">
    <div class="card__inner"  @click.stop="$emit('selectedProduct', product)">
      <div class='card__img'>
        <img :src="product.thumbnail || product.images?.[0]  ||  ''" alt="img">
      </div>
      <h3>{{ product.title }}</h3>
      <p class="card__descriptions">{{ product.description }}</p>
      <div class="card__raiting">
        <StarRating :rating="product.rating"/>
        {{ product.rating }}
      </div>
      <p class="card__price" >&#x20AC {{ product.price }}</p>
    </div>
    <button
        class="card__btn"
    >Add Cart</button>
  </div>

</template>
<script>
import StarRating from "@/components/UI/Raiting.vue";

export default {
  name: 'ProductCard',
  components: {StarRating},
  props: {
    product: {
      type: Object,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 12px;

  &__inner{
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
  }
  h3 {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
  }

  &__descriptions{
    cursor: pointer;
  }

  &__price{
    font-size: 24px;
    margin-top: auto;
  }

  &__raiting{
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
  }

  &__img {
    display: flex;
    flex-direction: column;
    padding: 10px;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    width: 100%;
    cursor: pointer;

    img {
      display: block;
      width: 150px;
      height: 150px;
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
