<template>
  <div class="container">
    <div class="calculator">
      <input v-bind:value="input" type="text" />

      <div class="buttons">
        <button class="btn" @click="clear()">C</button>
        <button class="btn" @click="ans()">ANS</button>
        <button class="btn" @click="del()">DEL</button>
        <button class="btn" @click="operatorSelect('+')">+</button>
        <button class="btn" @click="buttonOnClick(1)">1</button>
        <button class="btn" @click="buttonOnClick(2)">2</button>
        <button class="btn" @click="buttonOnClick(3)">3</button>
        <button class="btn" @click="operatorSelect('-')">-</button>
        <button class="btn" @click="buttonOnClick(4)">4</button>
        <button class="btn" @click="buttonOnClick(5)">5</button>
        <button class="btn" @click="buttonOnClick(6)">6</button>
        <button class="btn" @click="operatorSelect('*')">*</button>
        <button class="btn" @click="buttonOnClick(7)">7</button>
        <button class="btn" @click="buttonOnClick(8)">8</button>
        <button class="btn" @click="buttonOnClick(9)">9</button>
        <button class="btn" @click="operatorSelect('/')">/</button>
        <button class="btn" @click="buttonOnClick(0)">0</button>
        <button class="btn" @click="buttonOnClick('.')">.</button>
        <button class="equals" @click="equals()">=</button>
      </div>
    </div>
    <ul class="log">
      <li id="historyList" v-for="value in history" v-bind:key="value">
        {{ value }}
      </li>
    </ul>
    <button id="clear" @click="clearLog()">clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: 0,
      input: "",
      firstValue: 0,
      secondValue: 0,
      currentOperator: "",
      history: [],
    };
  },
  methods: {
    buttonOnClick(value) {
      this.input = `${this.input}${value}`;
    },
    clear() {
      this.input = "";
      this.result = 0;
    },
    ans() {
      this.input = this.result;
    },
    del() {
      this.input = this.input.slice(0, -1);
    },
    equals() {
      this.secondValue = this.input;
      switch (this.currentOperator) {
        case "+":
          if (this.firstValue === "9" && this.secondValue === "10") {
            this.input = "21";
            let nice = " Whats niiine plus teeen? ";
            this.history.push(nice);
          } else {
            this.result =
              parseFloat(this.firstValue) + parseFloat(this.secondValue);
            this.input = this.result;
            this.addToLog("+");
          }
          break;
        case "-":
          this.result =
            parseFloat(this.firstValue) - parseFloat(this.secondValue);
          this.input = this.result;
          this.addToLog("-");
          break;
        case "*":
          this.result =
            parseFloat(this.firstValue) * parseFloat(this.secondValue);
          this.input = this.result;
          this.addToLog("*");
          break;
        case "/":
          this.result =
            parseFloat(this.firstValue) / parseFloat(this.secondValue);
          this.input = this.result;
          this.addToLog("/");
          break;
        default:
          break;
      }
    },
    operatorSelect(operator) {
      this.firstValue = this.input;
      this.currentOperator = operator;
      this.input = "";
    },
    addToLog(operator) {
      this.history.push(
        this.firstValue +
          " " +
          operator +
          " " +
          this.secondValue +
          " = " +
          this.result
      );
    },
    clearLog() {
      this.history = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "Calculator.css";
</style>
