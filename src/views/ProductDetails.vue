<template>
<section class="py-5">
  <div class="container px-4 px-lg-5 my-5">
    <div class="row gx-4 gx-lg-5 align-items-center">
      <div class="col-md-6">
        <img :src="image" alt="" class="card-img-top mb-5 mb-md-0" height="700" width="600">
      </div>
      <div class="col-md-6">
        <div class="small mb-1"></div>
        <h1 class="display-5 fw-bolder">{{ title }}</h1>
        <div class="fs-5 mb-5">
          <span>${{ price }}</span>
        </div>
        <p class="lead">{{ description }}</p>
        <div class="d-flex">
          <input v-model="amount" type="number" style="max-width: 5rem" id="inputQuantity" class="form-control text-center me-3">
          <button class="btn btn-outline-dark flex-shrink-0"><i class="bi-cart-fill me-1" @click="addToCart($event)">Add to cart</i></button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import {
  computed, onMounted, ref,
} from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'ProductDetails',
  setup() {
    const route = useRoute();
    const store = useStore();

    const currentCart = computed(() => store.state.Products.products);

    const id = ref(0);
    const title = ref('');
    const description = ref('');
    const image = ref('');
    const price = ref(0);
    const amount = ref(1);

    onMounted(async () => {
      const response = await axios.get(`products/${route.params.id}`);

      if (Array.isArray(route.params.id)) return;

      id.value = response.data.id;
      title.value = response.data.title;
      description.value = response.data.description;
      image.value = response.data.image;
      price.value = response.data.price;
    });

    const addToCart = async (event: Event) => {
      const { data } = await axios.get(`products/${id.value}`);

      if (data === null) return;

      // currentCart.value.push(data);

      const newCart = [];
      for (let i = 0; i < currentCart.value.length; i += 1) {
        newCart.push(currentCart.value[i]);
      }

      for (let i = 1; i <= amount.value; i += 1) {
        newCart.push(data);
      }

      await store.dispatch('Products/setProducts', newCart);

      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLElement).innerText = 'Added to cart';
    };

    return {
      title,
      description,
      image,
      price,
      amount,
      addToCart,
    };
  },
};
</script>

<style scoped>

</style>
