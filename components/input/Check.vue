<template>
  <div>
    <div v-if="!checkOnly" class="row mt-3">
      <div class="col-md-3 label">
        <label class="text-capitalize" :for="idName">{{ name }}</label>
      </div>
      <div class="col-md-9">
        <div class="checkbox">
          <input
            :disabled="disabled"
            type="checkbox"
            :id="idName"
            v-model="value"
          />
          <label :for="idName">
            <span class="text-capitalize"
              >{{ value ? null : 'No ' }}{{ label }}</span
            ></label
          >
        </div>
      </div>
    </div>
    <div v-else class="checkbox mb-2">
      <input
        :disabled="disabled"
        type="checkbox"
        :id="idName"
        v-model="value"
      />
      <label :for="idName" class="pl-5">
        <span class="text-capitalize">
          {{ value ? null : '' }}{{ label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-check',
  props: {
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    val: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    checkOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    value: {
      get() {
        return this.val;
      },
      set(value) {
        if (value) this.$emit('get', true);
        else this.$emit('get', false);
      },
    },
    idName() {
      return this.name.replace(/ /g, '') || 'id';
    },
  },
};
</script>

<style scoped>
.checkbox {
  width: 100%;
  position: relative;
  display: block;
}

.checkbox label {
  position: relative;
  min-height: 34px;
  display: block;
  padding-left: 40px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}

.checkbox label span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.checkbox label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  margin: 4px;
  width: 2em;
  height: 2em;
  transition: transform 0.28s ease;
  border-radius: 5px;
  border: 2px solid #7f8388;
}

.checkbox label:after {
  content: '';
  display: block;
  width: 1.2em;
  height: 0.7em;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  transform: rotate(-45deg) scale(0);
  transition: transform ease 0.25s;
  position: absolute;
  top: 10px;
  left: 10px;
}

.checkbox input[type='checkbox'] {
  width: auto;
  opacity: 0.00000001;
  position: absolute;
  left: 0;
  margin-left: -20px;
}

.checkbox input[type='checkbox']:checked ~ label:before {
  border: 2px solid var(--primary);
  background-color: var(--primary);
}

.checkbox input[type='checkbox']:checked ~ label:after {
  transform: rotate(-45deg) scale(1);
}

.checkbox input[type='checkbox']:focus + label::before {
  outline: 0;
}
</style>
