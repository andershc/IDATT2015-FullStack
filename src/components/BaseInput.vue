<template>
  <label
      id="label"
      v-if="label"
      :for="uuid"
  >
    *{{ label }}:
  </label>
  <input
      class="baseInputField"
      v-bind="{
      ...$attrs,
      onInput: updateValue
    }"
      :id="uuid"
      :value="modelValue"
      :placeholder="label"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="!!error"
      :class="{ error }"
      @input="$emit('update:modelValue', $event.target.value)"
  >
  <BaseErrorMessage
      v-if="error"
      :id="`${uuid}-error`"
  >
    {{ error }}
  </BaseErrorMessage>
</template>

<script>
import UniqueId from "../features/UniqueId.js";
import SetupFormComponent from "../features/SetupFormComponent";
import BaseErrorMessage from "@/components/BaseErrorMessage";


export default {
  name: "BaseInput",
  components: {
    BaseErrorMessage,
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, context) {
    const {updateValue} = SetupFormComponent(props, context);
    const uuid = UniqueId().getId();
    return {
      updateValue,
      uuid,
    };
  }
}
</script>
<style>
.baseInputField {
  text-align: left;
  font-size: 1em;
  color: black;
  resize: none;
  background: white;
  padding: 0.5em;
}
.baseInputField:invalid{
  border-color: red;
  border-width: 0.1em;
}

::placeholder {
  color: darkgray;
}

#label {
  text-align: left;
}
</style>