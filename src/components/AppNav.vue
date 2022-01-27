<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container px-4 px-lg-5">
      <router-link class="navbar-brand" to="/">VueCommerce</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item"><router-link class="nav-link" aria-current="page" to="/" exact-active-class="active">Home</router-link></li>
        </ul>
        <ul v-if="user.id !== 0" class="navbar-nav mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item"><router-link class="nav-link" to="/login" active-class="active" @click="logout">Logout</router-link></li>
        </ul>
        <ul v-else class="navbar-nav mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item"><router-link class="nav-link" to="/login" active-class="active" @click="logout">Login</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/register" active-class="active" @click="logout">Register</router-link></li>
        </ul>
<!--        <form class="d-flex">-->
        <ul class="navbar-nav mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item">
            <button class="btn btn-outline-dark" type="button">
<!--              <i class="bi-cart-fill me-1"></i>-->
              <router-link class="nav-link d-inline" to="/cart" active-class="active">Cart</router-link>
              <span class="badge bg-dark text-white ms-0 rounded-pill">{{ cartAmount }}</span>
            </button>
          </li>
        </ul>
<!--          <button class="btn btn-outline-dark" type="button">-->
<!--            <i class="bi-cart-fill me-1"></i>-->
<!--            <router-link to="/cart" active-class="active">Cart</router-link>-->
<!--            <span class="badge bg-dark text-white ms-1 rounded-pill">{{ cartAmount }}</span>-->
<!--          </button>-->
<!--        </form>-->
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

export default {
  name: 'AppNav',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);
    const currentCart = computed(() => store.state.Products.products);
    const cartAmount = ref(currentCart.value.length);

    console.log(currentCart.value);

    watch(currentCart, () => {
      cartAmount.value = currentCart.value.length;
    });

    const logout = async () => {
      sessionStorage.clear();
      await axios.post('logout');
    };

    return {
      user,
      currentCart,
      cartAmount,
      logout,
    };
  },
};
</script>

<style scoped>

</style>
