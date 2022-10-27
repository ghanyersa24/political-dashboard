<template>
  <div :class="`card card-${type} rounded`">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>
