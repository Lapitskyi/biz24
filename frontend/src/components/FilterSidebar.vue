<template>
  <transition name="slide">
    <div v-if="visible" class="sidebar">
      <h3>Фильтры</h3>

      <label>
        Категория:
        <input v-model="filters.category" placeholder="Введите категорию" />
      </label>

      <label>
        Бренд:
        <input v-model="filters.brand" placeholder="Введите бренд" />
      </label>

      <button @click="applyFilters">Применить</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'FilterSidebar',
  props: {
    visible: Boolean
  },
  data() {
    return {
      filters: {
        category: '',
        brand: ''
      }
    };
  },
  mounted() {
    const query = this.$route.query;
    this.filters.category = query.category || '';
    this.filters.brand = query.brand || '';
    this.filters.price = query.price ? Number(query.price) : null;
  },
  methods: {
    applyFilters() {
      const query = {
        category: this.filters.category || undefined,
        brand: this.filters.brand || undefined,
        price: this.filters.price || undefined
      };

      Object.keys(query).forEach(key => {
        if (!query[key]) delete query[key];
      });
      this.$router.replace({ query }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });

      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
