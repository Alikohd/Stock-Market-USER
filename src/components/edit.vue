<script>
import { instance } from "@/main.js";

export default {
  name: 'Edit',
  data() {
    return {
      brokerName: this.$store.getters.getUser.name,
    }
  },
  methods: {
    async editName() {
      try {
        if (this.brokerName) {
          await instance.patch("/brokers/set_name", {
            name: this.brokerName,
            id: this.$store.getters.getUser.id
          });
          this.$store.commit('setUserName', this.brokerName);
          this.go('/home');
        } else {
          alert("Name is empty");
        }
      } catch (error) {
        console.error("Error editing name:", error);
      }
    },
    go(route) {
      this.$router.push(route);
    }
  }
}
</script>

<template>
  <section>
    Ваше имя:
    <br/>
    <input v-model="brokerName">
    <br/>
    <button @click="editName" class="action-button"> Сохранить </button>
    <button @click="go('/home')" class="action-button"> Назад </button>
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
