<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <h2>Checkout form</h2>
        <!--        <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>-->
      </div>

      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">{{ cartAmount }}</span>
          </h4>
          <ul class="list-group mb-3">
            <li v-for="cartItem in cartItems" :key="cartItem.product.id" class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">{{ cartItem.product.title }} x {{ cartItem.amount }}</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">${{ cartItem.product.price * cartItem.amount }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${{ totalPrice }}</strong>
            </li>
          </ul>
        </div>

        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Shipping address</h4>
          <form class="needs-validation" @submit.prevent="createOrder" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="firstName" placeholder="" required v-model="firstName" />
                <div class="invalid-feedback">Valid first name is required.</div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder="" required v-model="lastName" />
                <div class="invalid-feedback">Valid last name is required.</div>
              </div>

              <div class="col-12">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com" required v-model="email" />
                <div class="invalid-feedback">Please enter a valid email address for shipping updates.</div>
              </div>

              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                <div class="invalid-feedback">Please enter your shipping address.</div>
              </div>

              <div class="col-12">
                <label for="address2" class="form-label">Address 2 <span class="text-muted">(Optional)</span></label>
                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
              </div>

              <div class="col-md-5">
                <label for="country" class="form-label">Country</label>
                <select class="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div class="invalid-feedback">Please select a valid country.</div>
              </div>

              <div class="col-md-4">
                <label for="state" class="form-label">State</label>
                <select class="form-select" id="state" required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div class="invalid-feedback">Please provide a valid state.</div>
              </div>

              <div class="col-md-3">
                <label for="zip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="zip" placeholder="" required />
                <div class="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr class="my-4" />

            <h4 class="mb-3">Payment</h4>

            <div class="my-3">
              <div class="form-check">
                <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required />
                <label class="form-check-label" for="credit">Credit card</label>
              </div>
              <div class="form-check">
                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                <label class="form-check-label" for="debit">Debit card</label>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required />
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">Name on card is required</div>
              </div>

              <div class="col-md-6">
                <label for="cc-number" class="form-label">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required />
                <div class="invalid-feedback">Credit card number is required</div>
              </div>

              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                <div class="invalid-feedback">Expiration date required</div>
              </div>

              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                <div class="invalid-feedback">Security code required</div>
              </div>
            </div>

            <hr class="my-4" />

            <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { CartItem } from "@/models/cart-item";

export default {
  name: "AppCart",
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.state.User.user);
    const firstName = ref(user.value.first_name);
    const lastName = ref(user.value.last_name);
    const email = ref(user.value.email);

    const currentCart = computed(() => store.state.Products.products);
    const cartAmount = ref(currentCart.value.length);
    const cartItems = ref<CartItem[]>([]);
    const totalPrice = ref(0.0);

    const newCartItems = [] as CartItem[];
    onMounted(async () => {
      for (let i = 0; i < currentCart.value.length; i += 1) {
        let alreadyExists = false;
        totalPrice.value += currentCart.value[i].price;

        for (let x = 0; x < newCartItems.length; x += 1) {
          if (currentCart.value[i].id === newCartItems[x].product.id) {
            newCartItems[x].amount += 1;
            alreadyExists = true;
          }
        }

        if (!alreadyExists) {
          newCartItems.push(new CartItem(currentCart.value[i], 1));
        }
      }
      cartItems.value = newCartItems;
    });

    const createOrder = async () => {
      if (cartItems.value.length < 1) {
        await router.push("/?complete=false");
        return;
      }

      if (firstName.value === "" || lastName.value === "" || email.value === "") {
        await router.push("/?complete=false");
        return;
      }

      const orderItems = [];
      for (let z = 0; z < newCartItems.length; z += 1) {
        orderItems.push({
          product_title: newCartItems[z].product.title,
          price: newCartItems[z].product.price,
          quantity: newCartItems[z].amount,
        });
      }

      try {
        await axios.post("orders", {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          order_items: orderItems,
        });

        await store.dispatch("OrderSummary/setSummary", cartItems);
        await store.dispatch("Products/setProducts", []);
        await router.push("/order-summary");
      } catch (e) {
        await router.push("/?complete=false");
      }
    };

    return {
      firstName,
      lastName,
      email,
      currentCart,
      cartAmount,
      cartItems,
      totalPrice,
      createOrder,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>
