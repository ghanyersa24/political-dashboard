<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9">
     <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-form',
  props: {
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    pholder() {
      if (!this.placeholder) return `Please input ${this.name}`;
      return this.placeholder;
    },
    idName() {
      return this.name.replace(/ /g, '');
    },
  },
};
</script>
