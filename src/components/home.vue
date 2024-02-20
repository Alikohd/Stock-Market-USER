<script>
export default {
  brokerName: 'Home',
  computed: {
    formattedBalance() {
      return this.$store.getters.getUser.balance.toFixed(2);
    },
    userName() {
      return this.$store.getters.getUser.name;
    }
  },
  methods: {
    go(route) {
      this.$router.push(route);
    }
  }
}
</script>

<template>
  <section>
    <h3>Ваш аккаунт:</h3>
    <h3>Имя: {{ userName }}</h3>
    <h3>Баланс: {{ formattedBalance }}$</h3>
  </section>
  <section>
    <button @click="go('/edit')" class="action-button">Редактировать</button>
    <button @click="go('/trades')" class="action-button">Торги</button>
    <br/>
    <button @click="go('/')" class="logout-button">Выход</button>
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

.logout-button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
