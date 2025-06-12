<template>
  <div class="search-input" :class="{'icon-right': iconPosition === 'right'}">
    <img
        v-if="iconSrc"
        :src="iconSrc"
        :alt="iconAlt"
        class="search-input__icon"
    />
    <input
        type="text"
        :placeholder="placeholder"
        :value="inputValue"
        @input="onInput"
        class="search-input__field"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: String,
    placeholder: {
      type: String,
      default: 'Search...'
    },
    iconSrc: {
      type: String,
      default: ''
    },
    iconAlt: {
      type: String,
      default: 'Search'
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    debounceTime: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      inputValue: this.value,
      timeoutId: null,
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    onInput(e) {
      this.inputValue = e.target.value;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.$emit('input', this.inputValue);
      }, this.debounceTime);
    }
  },
  beforeDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
};
</script>

<style scoped lang="scss">
.search-input {
  position: relative;
  width: 100%;
  max-width: 300px;

  &__field {
    width: 100%;
    padding: 8px 12px 8px 36px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
  }

  & .search-input__icon {
    left: 10px;
  }

  &.icon-right {
    .search-input__field {
      padding-left: 12px;
      padding-right: 36px;
    }

    .search-input__icon {
      left: auto;
      right: 10px;
    }
  }
}
</style>
