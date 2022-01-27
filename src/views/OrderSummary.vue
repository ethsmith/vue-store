<template>
  <div class="card mt-50 mb-50">
    <div class="col d-flex"><span class="text-muted" id="orderno">order successful</span></div>
    <div class="gap">
      <div class="col-2 d-flex mx-auto"> </div>
    </div>
    <div class="title mx-auto"> Thank you for your order! </div>
    <div class="main"> <span id="sub-title">
            <p><b>Payment Summary</b></p>
        </span>
      <div v-for="cartItem in cartItems"  :key="cartItem.product.id" class="row row-main">
        <div class="col-3"> <img class="img-fluid" :src="cartItem.product.image"> </div>
        <div class="col-6">
          <div class="row d-flex">
            <p><b>{{ cartItem.product.title }} x {{ cartItem.amount }}</b></p>
          </div>
<!--          <div class="row d-flex">-->
<!--            <p class="text-muted">128GB White</p>-->
<!--          </div>-->
        </div>
        <div class="col-3 d-flex justify-content-end">
          <p><b>${{ cartItem.product.price * cartItem.amount }}</b></p>
        </div>
      </div>
      <hr>
      <div class="total">
        <div class="row">
          <div class="col"> <b> Total:</b> </div>
          <div class="col d-flex justify-content-end"> <b>${{ totalPrice }}</b> </div>
        </div> <router-link class="btn d-flex mx-auto" to="/?complete=true"> Return to home </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { CartItem } from '@/models/cart-item';

export default {
  name: 'OrderSummary',
  setup() {
    const store = useStore();
    const router = useRouter();

    const cartItemStore = computed(() => store.state.OrderSummary.summary);
    const cartItems = ref<CartItem[]>(cartItemStore.value);
    const totalPrice = ref(0.0);

    onMounted(async () => {
      if (cartItems.value.length < 1) {
        await router.push('/?complete=false');
      }
      for (let i = 0; i < cartItems.value.length; i += 1) {
        totalPrice.value += (cartItems.value[i].product.price * cartItems.value[i].amount);
      }
    });

    return {
      cartItems,
      totalPrice,
    };
  },
};
</script>

<style scoped>
body {
  background: rgb(213, 217, 233);
  min-height: 100vh;
  vertical-align: middle;
  display: flex;
  font-family: Muli;
  font-size: 14px
}

.card {
  margin: auto;
  width: 320px;
  max-width: 600px;
  border-radius: 20px
}

.mt-50 {
  margin-top: 50px
}

.mb-50 {
  margin-bottom: 50px
}

@media(max-width:767px) {
  .card {
    width: 80%
  }
}

@media(height:1366px) {
  .card {
    width: 75%
  }
}

#orderno {
  padding: 1vh 2vh 0;
  font-size: smaller
}

.gap .col-2 {
  background-color: rgb(213, 217, 233);
  width: 1.2rem;
  padding: 1.2rem;
  margin-top: -2.5rem;
  border-radius: 1.2rem
}

.title {
  display: flex;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 12%
}

.main {
  padding: 0 2rem
}

.main img {
  border-radius: 7px
}

.main p {
  margin-bottom: 0;
  font-size: 0.75rem
}

#sub-title p {
  margin: 1vh 0 2vh 0;
  font-size: 1rem
}

.row-main {
  padding: 1.5vh 0;
  align-items: center
}

hr {
  margin: 1rem -1vh;
  border-top: 1px solid rgb(214, 214, 214)
}

.total {
  font-size: 1rem
}

@media(height: 1366px) {
  .main p {
    margin-bottom: 0;
    font-size: 1.2rem
  }

  .total {
    font-size: 1.5rem
  }
}

.btn {
  background-color: rgb(3, 122, 219);
  border-color: rgb(3, 122, 219);
  color: white;
  margin: 7vh 0;
  border-radius: 7px;
  width: 60%;
  font-size: 0.8rem;
  padding: 0.8rem;
  justify-content: center
}

.btn:focus {
  box-shadow: none;
  outline: none;
  box-shadow: none;
  color: white;
  -webkit-box-shadow: none;
  -webkit-user-select: none;
  transition: none
}

.btn:hover {
  color: white
}
</style>
