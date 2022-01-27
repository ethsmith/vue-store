<template>
  <nav class="position-relative">
    <ul class="pagination position-absolute top-50 start-50 translate-middle">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="previous"
          >Previous</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'AppPagination',
  emits: ['page-changed'],
  props: {
    lastPage: Number,
  },
  setup(props, context) {
    const page = ref(1);

    watch(page, () => {
      context.emit('page-changed', page.value);
    });

    const next = () => {
      if (page.value < props.lastPage) {
        page.value += 1;
      }
    };

    const previous = () => {
      if (page.value > 1) {
        page.value -= 1;
      }
    };

    return {
      next,
      previous,
    };
  },
};
</script>
