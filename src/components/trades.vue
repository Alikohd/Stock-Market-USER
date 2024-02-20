<script>
import io from 'socket.io-client';
import {Chart} from "chart.js/auto";
import {nextTick, shallowRef} from "vue";
import {instance} from "@/main.js";
import Stock from "@/components/stock.vue";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import {Line} from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default {
  name: 'Trades',
  components: {
    Stock,
    Line
  },
  data() {
    return {
      socket: null,
      chartRefs: [],
      stocks: [],
      dates: [],
      current_cost: [],
      qty_chosen: [],
      sum: [],
      balance: this.$store.getters.getUser.balance,
      quantity: [],
      profit: [],
      graphics_label: [],
      graphics_data: [],
      all_graphic: []
    };
  },
  async mounted() {
    this.socket = io('http://localhost:4000');

    this.socket.on('message', (message) => {
      this.handleSocket(message);
    });
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    async finish_trade() {
      alert("А торги-то завершились!");
      this.$router.push('/home');
    },

    handleSocket(data) {
      console.log('handleSocket(), data =', data);
      if (data.finish) {
        this.finish_trade();
      } else if (data.stocks) {
        this.add_stocks(data);
      } else {
        this.add_points(data);
      }
    },

    add_stocks(data) {
      this.stocks = data.stocks;
      this.dates = data.data;
      this.get_personal_stocks(data.stocks);
      this.$nextTick(() => {
        this.graphic();
      });
    },

    async get_personal_stocks(stocks) {
      try {
        const res = await instance.post("/brokers/get_broker_stocks", {
          brokerId: this.$store.getters.getUser.id,
          brokerStocks: stocks
        });

        this.personal_stocks = res.data;
        this.fill_personal_stocks();
      } catch (error) {
        console.error("Error getting personal stocks:", error);
      }
    },

    fill_personal_stocks() {
      for (let i = 0; i < this.personal_stocks.data.length; i++) {
        this.quantity.push(this.personal_stocks.data[i].qty);
        this.profit.push(Math.round(this.personal_stocks.data[i].balance * 100) / 100);
      }
    },

    graphic() {
      this.chartRefs = [];

      for (let i = 0; i < this.stocks.length; i++) {
        const ctx = document.getElementById(i.toString());

        if (!ctx) {
          console.error(`Canvas element with id ${i} not found.`);
          return;
        }

        const stockData = this.dates[i];
        const lastStockData = stockData[stockData.length - 1];

        const dates = stockData.map(item => item.date);
        const opens = stockData.map(item => item.open);

        this.current_cost.push(lastStockData.open);
        this.sum.push(0);
        this.qty_chosen.push(0);

        const data = {
          labels: dates,
          datasets: [{
            label: this.stocks[i],
            backgroundColor: 'orange',
            borderColor: 'orange',
            data: opens,
          }]
        };

        const chartRef = shallowRef(null);

        chartRef.value = new Chart(ctx, {
          type: 'line',
          data: data,
        });

        this.chartRefs.push(chartRef);
      }
    },


    add_points(data) {
      if (!data || !data.length) {
        console.warn("No data to add points.");
        return;
      }

      data.forEach((item, i) => {
        const currentChart = this.chartRefs[i]?.value;

        if (currentChart) {
          currentChart.data.datasets[0].data.push(item.open);
          currentChart.data.labels.push(item.date);
          this.current_cost[i] = item.open;

          nextTick(() => {
            currentChart.update();
          });
        } else {
          console.error(`Chart with index ${i} not found.`);
        }
      });
    },

    change_qty(index, kol) {
      this.qty_chosen[index] += kol;
    },

    async confirm_deal(index) {
      try {
        const res = await instance.post("/brokers/deal", {
          id: this.$store.getters.getUser.id,
          qty: this.qty_chosen[index],
          sum: Math.round(this.qty_chosen[index] * this.current_cost[index] * 100) / 100,
          stock: this.stocks[index]
        });

        if (res.data.status === "ok") {
          this.$store.commit('setUserBalance', Math.round(Number(res.data.balance) * 100) / 100);
          this.balance = this.$store.getters.getUser.balance;
          this.quantity[index] = res.data.qty;
          this.profit[index] = Math.round(res.data.stock_balance * 100) / 100;
          this.qty_chosen[index] = 0;
        } else {
          alert(res.data.status);
          this.qty_chosen[index] = 0;
        }
      } catch (error) {
        console.error("Error confirming deal:", error);
      }
    }
  }
}
</script>

<template>
  <h4>Ваш счёт: {{ Math.round(balance * 100) / 100 }}$</h4>

  <div v-for="(stock, index) in stocks" :key="index">
    <canvas :id="`${index}`" class="chart-canvas"></canvas>

    <Stock
        :index="index"
        :current_cost="current_cost[index]"
        :quantity="quantity[index]"
        :profit="profit[index]"
        :qty_chosen="qty_chosen[index]"
        :balance="balance"
        @inc_qty="change_qty(index, 1)"
        @dec_qty="change_qty(index, -1)"
        @confirm_deal="confirm_deal(index)"
    />
  </div>

  <button @click="$router.push('/home')">Выйти</button>
</template>

<style scoped>
.chart-canvas {
  width: 50%;
  height: 400px;
}
</style>


