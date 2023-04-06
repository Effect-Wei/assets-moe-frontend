<script setup>
import { onMounted, reactive } from "vue"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Colors,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale
} from "chart.js"
import "chartjs-adapter-luxon"

ChartJS.register(
  Colors,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale
)

const PROM_API = "https://prom.assets.moe"
const PROM_REQUEST_QUERY =
  'sum(increase(nginx_vts_server_requests_total{host="*.assets.moe"}[1h]))'
const PROM_TRAFFIC_QUERY =
  'sum(increase(nginx_vts_server_bytes_total{host="*.assets.moe",direction="out"}[1h]))'

const state = reactive({
  loaded: false,
  chartData: {
    datasets: [
      {
        type: "line",
        label: "Traffic",
        data: [],
        yAxisID: "yTraffic",
        tension: 0.4,
        pointRadius: 0,
        borderColor: "#66ccffdd"
      },
      {
        type: "bar",
        label: "Request",
        data: [],
        yAxisID: "yRequest",
        backgroundColor: "#ee3333dd"
      }
    ]
  },
  chartOptions: {
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderRadius: 3
      }
    },
    interaction: {
      intersect: false,
      axis: "x"
    },
    plugins: {
      legend: {
        labels: {
          color: "#ddd"
        }
      },
      title: {
        display: true,
        color: "#ddd",
        text: "Assets.moe Statistics"
      }
    },
    scales: {
      x: {
        type: "time",
        offset: true,
        position: "bottom",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM d"
          }
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: "#ddd"
        }
      },
      yTraffic: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          color: "#ddd",
          text: "Traffic in MBs"
        },
        grid: {
          color: "#ddd",
          tickColor: "#00000000"
        },
        ticks: {
          color: "#ddd"
        }
      },
      yRequest: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          color: "#ddd",
          text: "Number of requests"
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: "#ddd"
        }
      }
    }
  }
})

onMounted(async () => {
  let startDate =
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 6
    ).getTime() / 1000
  let endDate = startDate + 7 * 86400

  let fetchTrafficData = fetch(
    `${PROM_API}/api/v1/query_range?query=${PROM_TRAFFIC_QUERY}&start=${startDate}&end=${endDate}&step=3600`
  )
    .then(async (resp) => {
      return await resp.json()
    })
    .then((respJson) => {
      let trafficData = respJson.data.result[0].values.map(
        ([timestamp, value]) => ({
          x: timestamp * 1000,
          y: value / (1024 * 1024)
        })
      )
      state.chartData.datasets[0].data = trafficData
    })

  let fetchRequestData = fetch(
    `${PROM_API}/api/v1/query_range?query=${PROM_REQUEST_QUERY}&start=${startDate}&end=${endDate}&step=3600`
  )
    .then(async (resp) => {
      return await resp.json()
    })
    .then((respJson) => {
      let requestData = respJson.data.result[0].values.map(
        ([timestamp, value]) => ({
          x: timestamp * 1000,
          y: value
        })
      )
      state.chartData.datasets[1].data = requestData
    })

  await Promise.all([fetchTrafficData, fetchRequestData])
  state.loaded = true
})
</script>

<template>
  <div class="stats-container">
    <div class="stats-chart">
      <Bar
        v-if="state.loaded"
        :data="state.chartData"
        :options="state.chartOptions"
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
  border: 1px solid #ddd;
  border-radius: 1rem;
}

.stats-chart {
  width: 95%;
  height: 400px;
}
</style>
