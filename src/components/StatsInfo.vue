<script setup>
import { onMounted, reactive } from "vue"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Colors,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from "chart.js"

ChartJS.register(
  Colors,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)

const PROMETHEUS_API = "https://prom.assets.moe"
const state = reactive({
  requestData: [],
  trafficData: [],
  chartData: [],
  loaded: false
})

onMounted(async () => {
  let startDate =
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 6
    ).getTime() / 1000
  let endDate =
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    ).getTime() / 1000

  let fetchRequestData = fetch(
    `${PROMETHEUS_API}/api/v1/query_range?query=sum(nginx_vts_server_requests_total{host="*.assets.moe"})&start=${startDate}&end=${endDate}&step=3600`
  )
    .then(async (resp) => {
      return await resp.json()
    })
    .then((respJson) => {
      let requestData = []
      for (const value of respJson.data.result[0].values) {
        requestData.push(value[0])
      }
      state.requestData = requestData
    })

  let fetchTrafficData = fetch(
    `${PROMETHEUS_API}/api/v1/query_range?query=sum(nginx_vts_server_bytes_total{host="*.assets.moe",direction="out"})&start=${startDate}&end=${endDate}&step=3600`
  )
    .then(async (resp) => {
      return await resp.json()
    })
    .then((respJson) => {
      let trafficData = []
      for (const value of respJson.data.result[0].values) {
        trafficData.push(value[0] / (1024 * 1024 * 1024))
      }
      state.trafficData = trafficData
    })

  await Promise.all([fetchRequestData, fetchTrafficData])

  state.chartData = {
    datasets: [
      {
        type: "bar",
        label: "Traffic",
        data: state.trafficData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)"
      },
      {
        type: "line",
        label: "Request",
        data: state.requestData,
        borderColor: "rgb(54, 162, 235)"
      }
    ]
  }
  state.loaded = true
})
</script>

<template>
  <div class="stats-container">
    <div class="stats-chart">
      <Bar
        v-if="state.loaded"
        :data="state.chartData"
        :options="{ maintainAspectRatio: false }"
      />
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 1px solid #3d3d3d;
  border-radius: 0.5rem;
}

.stats-chart {
  width: 95%;
  height: 300px;
}
</style>
