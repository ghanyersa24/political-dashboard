<template>
  <tutorial>
    <div class="class-meeting">
      <h1>adadsa</h1>
      <nuxt-logo />
    </div>
  </tutorial>
</template>

<script>
import NuxtLogo from '~/components/NuxtLogo.vue';
const caraBertag = 'testing yah';
export default {
  components: { NuxtLogo },
  name: 'IndexPage',
  data() {
    return {
      text: `ini cara ${caraBertag}`,
    };
  },
};
</script>
