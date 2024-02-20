<script>
import { instance } from "@/main.js";

export default {
  name: 'Login',
  data() {
    return {
      brokerName: 'Valery'
    }
  },
  methods: {
    async enter() {
      try {
        if (!this.brokerName.trim()) {
          alert("Please enter your name");
          return;
        }

        if (this.brokerName.length > 20) {
          alert(`Too long name ${this.brokerName}`);
          return;
        }

        const res = await instance.get("/brokers/name/" + this.brokerName);
        if (res.data) {
          console.log(res.data);
          this.$store.commit('setUser', res.data);
          this.$router.push('/home');
        } else {
          alert(`Broker ${this.brokerName} not found`);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  }
}
</script>

<template>
  <section>
    <h3>Добро пожаловать на StockTrading!</h3>
    Введите Ваше имя..
  </section>
  <section>
    <input v-model="brokerName" placeholder="Ваше имя">
    <br/>
    <button @click="enter" class="action-button">Вход</button>
  </section>
</template>

<style scoped>
.action-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #45a049;
}
</style>
