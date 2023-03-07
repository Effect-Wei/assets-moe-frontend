<script setup></script>

<template>
  <div class="cover">
    <hgroup class="cover-texts">
      <h1 class="cover-title">ASSETS.MOE</h1>
      <h2 class="cover-subtitle">
        <i>免费 / <del>孱弱</del> / <del>不稳定</del> 的静态资源加速服务</i>
      </h2>
    </hgroup>

    <span class="material-symbols-outlined float-down">expand_more</span>
  </div>
</template>

<style scoped>
.cover {
  position: sticky;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(https://api.effects.space/bing);
  background-size: cover;
  background-position: center;
}

@media (prefers-color-scheme: dark) {
  .cover {
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ),
      url(https://api.effects.space/bing);
    background-size: cover;
    background-position: center;
  }
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

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 48;
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
