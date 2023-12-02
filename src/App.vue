<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Hello.vue'
</script>

<template>
  <header>
    <img alt="filmfriend logo" class="logo" width="125" height="125" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjIwMDMsMCwwLDEuNjA4MzYsLTM4OC4yODUsLTI3NS4yOTEpIj4KICAgICAgICA8cGF0aCBkPSJNMjc4LjczNSw0MTQuMTExTDI3OC43MzUsMzM2LjMzNUMyNzguNzM1LDMxMy4yNDggMjk3LjU5MiwyOTQuNTA0IDMyMC44MTgsMjk0LjUwNEwzMzYuMTI4LDI5NC41MDRDMzM5LjcwNiwyOTIuMjUyIDM0MC4zODgsMjg0Ljg1NyAzNDAuMzg1LDI3Ni4yNDRDMzQwLjM4NSwyNjcuNzM3IDM0Ny4zMzMsMjYwLjgzIDM1NS44OTIsMjYwLjgzTDM3OS4zNTUsMjYwLjgzQzM4Ny45MTQsMjYwLjgzIDM5NC44NjIsMjY3LjczNyAzOTQuODYyLDI3Ni4yNDRDMzk0Ljk0MywyODMuNzUxIDM5NC40NTMsMjkyLjAyNCAzOTguMjc3LDI5NC41MDRMNDcwLjE1NywyOTQuNTA0QzQ4MS44NzMsMjgwLjQ1MSA0OTEuNzYzLDI2NS4xMzYgNDk3LjUxOCwyNDcuNjRDNTA0LjExMiwyMzguNjc4IDUwOC43ODgsMjM2LjE1MyA1MTEuOTQsMjM3LjQzOEw2MDkuNDM1LDIzNy40MzhDNjE1LjIzOSwyMzcuNDM4IDYyNy44MDYsMjQzLjQzOCA2MjcuODA2LDI0OS4yMDhDNjM2LjY0NywyNjUuNzE5IDY0NC42NjcsMjgyLjgyMiA2NTQuODU0LDI5NC41MDRMODAzLjAzLDI5NC41MDRDODI2LjI1NywyOTQuNTA0IDg0NS4xMTQsMzEzLjI0OCA4NDUuMTE0LDMzNi4zMzVMODQ1LjExNCw0MTQuMTExTDcwMC45NTgsNDE0LjExMUM2ODkuNzM1LDM0OC4xNDEgNjMxLjkyMSwyOTcuODMxIDU2Mi4zNzksMjk3LjgzMUM0OTIuODM3LDI5Ny44MzEgNDM1LjAyMywzNDguMTQxIDQyMy44LDQxNC4xMTFMMjc4LjczNSw0MTQuMTExWk04NDUuMTE0LDQzMy41ODNMODQ1LjExNCw1MzguNjUyQzg0NS4xMTQsNTYxLjczOSA4MjYuMjU3LDU4MC40ODMgODAzLjAzLDU4MC40ODNMMzIwLjgxOCw1ODAuNDgzQzI5Ny41OTIsNTgwLjQ4MyAyNzguNzM1LDU2MS43MzkgMjc4LjczNSw1MzguNjUyTDI3OC43MzUsNDMzLjU4M0w0MjEuODg1LDQzMy41ODNDNDIxLjg0OCw0MzQuODk2IDQyMS44MjksNDM2LjIxMyA0MjEuODI5LDQzNy41MzVDNDIxLjgyOSw1MTQuNjM5IDQ4NC44MDgsNTc3LjIzOCA1NjIuMzc5LDU3Ny4yMzhDNjM5Ljk1LDU3Ny4yMzggNzAyLjkyOSw1MTQuNjM5IDcwMi45MjksNDM3LjUzNUM3MDIuOTI5LDQzNi4yMTMgNzAyLjkxLDQzNC44OTYgNzAyLjg3Myw0MzMuNTgzTDg0NS4xMTQsNDMzLjU4M1pNMzkzLjA1NywzMzguNTgzTDMzOC40MzQsMzM4LjU4M0wzMzguNDM0LDM1OC4wNTRMMzkzLjA1NywzNTguMDU0TDM5My4wNTcsMzM4LjU4M1pNNTY0LjIyNyw1NTMuMzY0TDU0Ny4zMSw1MTMuMDQyTDYyMi45MjEsNDg2Ljc0Mkw2MzguOTE3LDUyNC44NjlDNjE4Ljg2Nyw1NDIuMjQ3IDU5Mi43ODcsNTUyLjkyMiA1NjQuMjI3LDU1My4zNjRaTTU1My44MDYsMzIyTDU3NC43MjMsMzcxLjg1N0w0OTkuMTEyLDM5OC4xNThMNDgwLjg5NywzNTQuNzRDNTAwLjAwNSwzMzYuMTU4IDUyNS41MTEsMzI0LjA0OSA1NTMuODA2LDMyMlpNNjUzLjY5MSw1MDkuNDkzTDU3NS4xOTIsMzIyLjM4NEM2MjUuNjUxLDMyNy44NzkgNjY2LjQ2NiwzNjUuNDQ2IDY3Ni41MzYsNDE0LjExMUM2NzcuODQ0LDQyMC40MyA2NzguNjMzLDQyNi45MzYgNjc4Ljg1OCw0MzMuNTgzQzY3OC45MDIsNDM0Ljg5NSA2NzguOTI0LDQzNi4yMTIgNjc4LjkyNCw0MzcuNTM1QzY3OC45MjQsNDY0LjcxNiA2NjkuNDg2LDQ4OS43MjQgNjUzLjY5MSw1MDkuNDkzWk00NjYuNjc4LDM3MS40MzlMNTQyLjI4Nyw1NTEuNjZDNDg3LjUyNCw1NDIuMTg1IDQ0NS44MzQsNDk0LjY2MSA0NDUuODM0LDQzNy41MzVDNDQ1LjgzNCw0MzYuMjEyIDQ0NS44NTYsNDM0Ljg5NSA0NDUuOSw0MzMuNTgzQzQ0Ni4xMjUsNDI2LjkzNiA0NDYuOTE0LDQyMC40MyA0NDguMjIyLDQxNC4xMTFDNDUxLjQ0OCwzOTguNTE4IDQ1Ny44MzIsMzg0LjA2MyA0NjYuNjc4LDM3MS40MzlaTTUwNi42NjUsNDE2LjE2TDU4Mi4yNzYsMzg5Ljg2TDYxNS4zNjgsNDY4LjczOUw1MzkuNzU3LDQ5NS4wNEw1MDYuNjY1LDQxNi4xNloiLz4KICAgIDwvZz4KPC9zdmc+Cg=="  />

      <nav>
        <RouterLink to="/">Startseite</RouterLink>
        <RouterLink to="/kameras">Kameras</RouterLink>
        <RouterLink to="/filmvorrat">Filmvorrat</RouterLink>
        <RouterLink to="/develop">in Entwicklung</RouterLink>
      </nav>
  </header>
  <body>
    <RouterView />
  </body>
  <footer>
    <nav>
      <RouterLink to="/about">über uns</RouterLink>
      <RouterLink to="/impressum">Impressum</RouterLink>
      <RouterLink to="/datenschutz">Datenschutz</RouterLink>
    </nav>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
