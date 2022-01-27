<template>
  <div v-if="complete === 'true'" class="alert alert-success alert-dismissible fade show text-center" role="alert">
    Purchase successful!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div v-if="complete === 'false' && currentCart.length === 0" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Your cart is empty!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div v-if="complete === 'false' && currentCart.length > 0" class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    Your purchase was unsuccessful, we apologize for the inconvenience.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>

  <!-- Header-->
  <header class="bg-dark py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="text-center text-white">
        <h1 class="display-4 fw-bolder">Shop in style</h1>
        <p class="lead fw-normal text-white-50 mb-0">Check out our cool products!</p>
      </div>
    </div>
  </header>
  <!-- Section-->
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
        <div class="col mb-5" v-for="product in products" :key="product.id">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" :src="product.image" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{ product.title }}</h5>
                <!-- Product reviews-->
                <div class="d-flex justify-content-center small text-warning mb-2">
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                </div>
                <!-- Product price-->
                ${{ product.price }}
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><button class="btn btn-outline-dark mt-auto" style="margin-bottom: .25rem;"><router-link class="btn-details" :to="{path: '/details/' + product.id}">View Details</router-link></button></div>
              <div class="text-center"><button class="btn btn-outline-dark mt-auto" @click="addToCart($event, product.id)">Add to cart</button></div>
            </div>
          </div>
        </div>
      </div>
      <AppPagination
        :last-page="lastPage"
        @page-changed="load($event)"
      ></AppPagination>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import AppPagination from '@/components/AppPagination.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AppPagination,
  },
  setup() {
    const products = ref([]);
    const store = useStore();
    const currentCart = computed(() => store.state.Products.products);

    const route = useRoute();
    const { complete } = route.query;

    const lastPage = ref(0);

    const load = async (page = 1) => {
      const { data } = await axios.get(`products?page=${page}`);
      products.value = data.data;
      lastPage.value = data.meta.last_page;
    };

    onMounted(load);

    const addToCart = async (event: Event, id: number) => {
      const { data } = await axios.get(`products/${id}`);

      if (data === null) return;

      // currentCart.value.push(data);

      const newCart = [];
      for (let i = 0; i < currentCart.value.length; i += 1) {
        newCart.push(currentCart.value[i]);
      }
      newCart.push(data);

      await store.dispatch('Products/setProducts', newCart);

      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLElement).innerText = 'Added to cart';
    };

    return {
      complete,
      currentCart,
      products,
      lastPage,
      load,
      addToCart,
    };
  },
});
</script>

<style scoped>
.btn-details {
  text-decoration: none;
  color: #212529;
}
</style>
