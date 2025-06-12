<template>
  <component :is="layout"/>
</template>

<script>

import PublicLayout from '@/layouts/PublicLayout.vue';
import PrivateLayout from '@/layouts/PrivateLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

export default {
  computed: {
    layout() {
      const layoutName = this.$route.meta.layout;
      const layouts = {
        public: PublicLayout,
        private: PrivateLayout,
        empty: EmptyLayout,
      };

      return layouts[layoutName];
    },
  },
};
</script>
