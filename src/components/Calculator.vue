<template>
  <div class="container">
    <div class="calculator">
      <input v-bind:value="input" type="text" />

      <div class="buttons">
        <button class="btn" @click="clear()">C</button>
        <button class="btn" @click="ans()">ANS</button>
        <button class="btn" @click="del()">DEL</button>
        <button class="btn operator" @click="operatorSelect('+')">+</button>
        <button class="btn" @click="buttonOnClick(1)">1</button>
        <button class="btn" @click="buttonOnClick(2)">2</button>
        <button class="btn" @click="buttonOnClick(3)">3</button>
        <button class="btn operator" @click="operatorSelect('-')">-</button>
        <button class="btn" @click="buttonOnClick(4)">4</button>
        <button class="btn" @click="buttonOnClick(5)">5</button>
        <button class="btn" @click="buttonOnClick(6)">6</button>
        <button class="btn operator" @click="operatorSelect('*')">*</button>
        <button class="btn" @click="buttonOnClick(7)">7</button>
        <button class="btn" @click="buttonOnClick(8)">8</button>
        <button class="btn" @click="buttonOnClick(9)">9</button>
        <button class="btn operator" @click="operatorSelect('/')">/</button>
        <button class="btn" @click="buttonOnClick(0)">0</button>
        <button class="btn operator" @click="buttonOnClick('.')">.</button>
        <button class="btn operator double" @click="equals()">=</button>
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
import axios from "axios";
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
    sendCalculations(object){
      const apiClient = axios.create({
        baseURL: "http://localhost:8001/api",
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      apiClient
        .post("/calc", object)
      .then((response) => {
        console.log("Answer sent successfully: " + response.data.result);
        this.input = response.data.result;
        this.history.push(response.data.log);
      })
      .catch((error) => {
        console.log("Failed to send with error: " + error)
      })
    },
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
      this.secondValue = this.input
      const object = {
        firstValue: this.firstValue,
        operator: this.currentOperator,
        secondValue: this.secondValue,
        userid: "11",
      };
      this.sendCalculations(object)
    },
    operatorSelect(operator) {
      this.firstValue = this.input;
      this.currentOperator = operator;
      this.input = "";
    },
    clearLog() {
      this.history = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./../styles/Calculator.css";
</style>
