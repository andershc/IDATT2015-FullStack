<template>
  <label id="label" v-if="label">*{{ label }}:</label>
  <textarea
      className="baseInputField"
      v-bind="{
        ...$attrs,
      onInput: updateValue,
      }"
      :id="uuid"
      :placeholder="label"
      :aria-describedby="error ? '${uuid}-error' : null"
      :aria-invalid="!!error"
      :value="modelValue"
      :class="{ error }"
  />
</template>

<script>
import UniqueId from "../features/UniqueId.js";
import SetupFormComponent from "../features/SetupFormComponent";

export default {
  name: "BaseInput",
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
      required: true
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
}

::placeholder {
  color: darkgray;
}

#label {
  text-align: left;
}
</style>