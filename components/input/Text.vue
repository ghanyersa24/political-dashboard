<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <input
        :type="type"
        v-model="data"
        :placeholder="pholder"
        :disabled="disabled"
        :readonly="disabled"
        class="form-control"
        :required="!noRequired"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-text',
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
    value: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  },
  computed: {
    pholder() {
      if (!this.placeholder) return `Please input ${this.name}`;
      return this.placeholder;
    },
    idName() {
      return this.name.replace(/ /g, '');
    },
    data: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
<style scoped>
.form-control:disabled {
  background-color: unset;
}
.form-control:focus {
  border: 1px solid white;
  color: white;
}
</style>
