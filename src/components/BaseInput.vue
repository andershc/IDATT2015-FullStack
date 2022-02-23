<template>
  <div id="inputWithLabel">
    <div>
      <label id="label" v-if="label" :for="uuid"> {{ label }}: </label>
    </div>
    <div>
      <input
        data-testid="inputField"
        class="baseInputField"
        v-bind="{
      ...$attrs,
      onInput: updateValue,
    }"
        :id="uuid"
        :value="modelValue"
        :placeholder="label"
        :aria-describedby="error ? `${uuid}-error` : null"
        :aria-invalid="!!error"
        :class="{ error }"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('validate')"
        @keypress="$emit('validate')"
    />
    </div>

  </div>

  <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
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
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  setup(props, context) {
    const { updateValue } = SetupFormComponent(props, context);
    const uuid = UniqueId().getId();
    return {
      updateValue,
      uuid,
    };
  },
};
</script>
<style scoped>
.baseInputField {
  text-align: left;
  font-size: 1em;
  color: black;
  background: white;
  padding: 0.5em;
}
.baseInputField:invalid {
  border-color: red;
  border-width: 0.1em;
}

::placeholder {
  color: darkgray;
}

#label {
  text-align: right;
  align-content: end;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 5em;

}
#inputWithLabel {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5em;
  position: relative;
}
</style>
