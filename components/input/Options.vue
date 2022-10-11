<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <select
        :required="!noRequired"
        :disabled="disabled"
        :readonly="disabled"
        v-model="data"
        class="custom-select"
      >
        <option selected disabled value="">- Pilih salah satu-</option>
        <option v-for="(option, i) in options" :key="i" :value="option.id">
          {{ option.value }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-select-option',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    val: {
      type: String,
      default: '',
    },
  },
  computed: {
    placeholder() {
      return `Please input ${this.name}`;
    },
    idName() {
      return this.name.replace(/ /g, '');
    },
    data: {
      get() {
        return this.val;
      },
      set(val) {
        this.$emit('get', val);
      },
    },
  },
};
</script>
