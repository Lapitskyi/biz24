<template>
  <transition name="slide">
    <div v-if="visible" class="sidebar">

      <div class="wrapper">
        <h2>Filters</h2>
      </div>

      <h3>Category</h3>
      <div class="wrapper">
        <div
            class="tabs"
            :class="{ active: filterProduct.category.includes(item) }"
            v-for="item in categoriesProduct"
            :key="item"
            @click="toggleFilter('category', item)"
        >
          {{ item }}
        </div>
      </div>
      <h3>Brands</h3>
      <div class="wrapper">
        <div
            class="tabs"
            :class="{ active: filterProduct.brand.includes(item) }"
            v-for="item in brandProduct"
            :key="item"
            @click="toggleFilter('brand', item)"
        >
          {{ item }}
        </div>
      </div>

      <div class="wrapper">
        <button @click="$emit('close')">Close</button>
      </div>

    </div>
  </transition>
</template>

<script>
import {mapState} from "vuex";
import {parseFiltersFromQuery} from "@/utils/helpers/parseQuery";

export default {
  name: 'FilterSidebar',
  props: {
    visible: Boolean
  },
  data() {
    return {
      filterQuery: {},
      defaultPrice: {
        min: 0,
        max: 10000
      },
      filters: {
        category: [],
        brand: [],
        price: {
          min: 0,
          max: 10000,
        },
      }
    };
  },
  mounted() {
    const parsed = parseFiltersFromQuery(this.$route.query);
    const hasAnyFilter = Object.keys(parsed).some(key => {
      const val = parsed[key];
      if (Array.isArray(val)) return val.length > 0;
      if (val && typeof val === 'object') {
        return Object.values(val).some(v => v !== null && v !== undefined);
      }
      return val !== null && val !== undefined && val !== '';
    });
    if (hasAnyFilter) {
      this.$store.dispatch('products/fetchFilterProducts', parsed);
    }
  },
  computed: {
    ...mapState('products', ['filterProduct']),
    categoriesProduct() {
      return this.$store.getters['products/allCategory'];
    },
    brandProduct() {
      return this.$store.getters['products/allBrand'];
    },
  },
  methods: {
    toggleFilter(name, value) {
      if (name === 'category' || name === 'brand') {
        const current = this.filters[name];
        this.filters[name] = current.includes(value)
            ? current.filter(item => item.toLowerCase() !== value.toLowerCase())
            : [...current, value];
      }

      this.applyFilters();
      this.filtersProduct()

    },
    filtersProduct() {
      const {price, ...rest} = this.filters
      this.$store.dispatch('products/fetchFilterProducts', rest);
    },
    applyFilters() {
      const query = {};
      if (this.filters.category.length) {
        query.category = this.filters.category;
      }

      if (this.filters.brand.length) {
        query.brand = this.filters.brand;
      }

      const {min, max} = this.filters.price;
      const {min: defMin, max: defMax} = this.defaultPrice;

      if (min !== defMin) {
        query['price[min]'] = min;
      }
      if (max !== defMax) {
        query['price[max]'] = max;
      }
      this.$router.replace({query}).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
      });
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
  z-index: 100;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}

h3 {
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  margin: 10px 0;
  padding: 10px 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
}

.tabs {
  font-size: 12px;
  display: flex;
  padding: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  text-transform: uppercase;
  position: relative;
}

.active {
  position: relative;
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:after {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 10px;
    content: 'х';
    width: 16px;
    height: 16px;
    background-color: #ec3b3b;
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 3;
  }
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
  width: 100%;
  margin-top: 20px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
