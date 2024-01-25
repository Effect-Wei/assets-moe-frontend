<script setup>
import { reactive } from "vue"

const stats = reactive({
  rows: [
    {
      cells: [
        { type: "TH", content: "原域名" },
        { type: "TH", content: "加速域名" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "cdnjs.cloudflare.com" },
        { type: "TD", content: "cdnjs.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "ajax.googleapis.com" },
        { type: "TD", content: "ajax.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "fonts.googleapis.com" },
        { type: "TD", content: "fonts.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "fonts.gstatic.com" },
        { type: "TD", content: "gstatic.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "themes.googleusercontent.com" },
        { type: "TD", content: "themes.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "secure.gravatar.com" },
        { type: "TD", content: "gravatar.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "cdn.jsdelivr.net" },
        { type: "TD", content: "jsd.assets.moe" }
      ]
    },
    {
      cells: [
        { type: "TD", content: "raw.githubusercontent.com" },
        { type: "TD", content: "ghraw.assets.moe" }
      ]
    }
  ]
})
</script>

<template>
  <section class="board cover">
    <h1 class="cover-texts cover-title">ASSETS.MOE</h1>
    <h2 class="cover-texts cover-subtitle">
      <i>免费 / <del>孱弱</del> / <del>不稳定</del> 的静态资源加速服务</i>
    </h2>

    <span class="material-symbols-outlined float-down">expand_more</span>
  </section>

  <section class="board howtouse">
    <table class="table">
      <template
        v-for="row in stats.rows"
        :key="row.index"
      >
        <tr>
          <template
            v-for="cell in row.cells"
            :key="cell.index"
          >
            <th v-if="cell.type == 'TH'">
              {{ cell.content }}
            </th>

            <td v-else-if="cell.type == 'TD'">
              {{ cell.content }}
            </td>
          </template>
        </tr>
      </template>
    </table>
  </section>
</template>

<style scoped>
.board {
  position: sticky;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cover {
  height: 100vh;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(https://api.effects.space/bing);
  background-size: cover;
  background-position: center;
}

.cover-texts {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.cover-title {
  font-size: calc(85vw / 13.66);
  font-weight: 600;
  letter-spacing: 0.5rem;
}

.cover-subtitle {
  font-size: calc(30vw / 13.66);
  font-weight: 400;
  letter-spacing: 0.3rem;
}

.howtouse {
  padding: 30px 0;
  background: #21262d;
}

.table {
  width: 500px;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #757575;
    text-align: center;
    color: #c9d1d9;
  }
  th {
    background: #161b22;
  }
}

.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 48;
}

.float-down {
  animation: 1.2s ease-in-out 0s infinite alternate-reverse float;
  position: absolute;
  bottom: 5%;
  right: calc(50% - 25px);
  font-size: 50px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 5px);
  }
}
</style>
