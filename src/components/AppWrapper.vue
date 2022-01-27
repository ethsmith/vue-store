<template>
  <AppNav></AppNav>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import AppNav from '@/components/AppNav.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'AppWrapper',
  components: {
    AppNav,
    AppFooter,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(async () => {
      // try {
      //   const { data } = await axios.get('user');
      //   await store.dispatch('User/setUser', data);
      // } catch (e) {
      //   await router.push('/login');
      // }
      const { data } = await axios.get('user');
      if (data === null) return;

      await store.dispatch('User/setUser', data);
    });
  },
};
</script>

<style scoped>

</style>
