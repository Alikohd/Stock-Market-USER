<script>
export default {
  props: {
    index: Number,
    current_cost: Number,
    quantity: Number,
    profit: Number,
    qty_chosen: Number,
    balance: Number,
  },
  computed: {
    costOfChosenStocks() {
      return Math.floor(-this.qty_chosen * this.current_cost * 100) / 100;
    },
    updatedBalance() {
      return Math.round((this.balance - this.qty_chosen * this.current_cost) * 100) / 100;
    },
  },
};
</script>

<template>
  <section>
    <section>
      <div>Стоимость акции: {{ current_cost }}</div>
      <div>В вашем портфеле: {{ quantity }}</div>
      <div>Разница по акции: {{ profit }}</div>
    </section>
    <div>
      <section>
        <button @click="$emit('dec_qty')" :disabled="Math.abs(qty_chosen) >= quantity && qty_chosen < 0">
          Продать
        </button>
        <!-- Выбранное колво акций -->
        {{ qty_chosen }}
        <button @click="$emit('inc_qty')">Купить</button>
      </section>
      <section>
        Стоимость выбранного числа акций:
        {{ costOfChosenStocks }}
        <br>
        Изменение баланса:
        ({{ updatedBalance }})
      </section>
      <button @click="$emit('confirm_deal')">Подтвердить</button>
    </div>
  </section>
</template>

