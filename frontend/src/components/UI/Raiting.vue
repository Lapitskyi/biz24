<template>
  <div class="stars">
    <span
        v-for="n in 5"
        :key="n"
        class="star"
        :class="{
        filled: n <= Math.floor(rating),
        half: n - rating === 0.5
      }"
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
            :fill="n <= Math.floor(rating) ? '#FFD700' : '#ccc'"
            d="M8,31a2,2,0,0,1-1.17-.38A2.13,2.13,0,0,1,6,28.69l.73-8.19L1.5,14.34a2.14,2.14,0,0,1-.39-2.06A2.06,2.06,0,0,1,2.6,10.9l7.62-1.8,4-7a2.05,2.05,0,0,1,3.58,0l4,7.05,7.62,1.8a2.06,2.06,0,0,1,1.49,1.38,2.14,2.14,0,0,1-.39,2.06L25.32,20.5l.73,8.19a2.13,2.13,0,0,1-.88,1.93,2,2,0,0,1-2,.2L16,27.58,8.84,30.82A2,2,0,0,1,8,31Z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    rating: Number
  }
};
</script>

<style scoped>
.stars {
  display: flex;
  gap: 4px;
}

svg {
  width: 12px;
  height: 12px;
}
</style>
