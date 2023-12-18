// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  modules: ['radix-vue/nuxt', 'nuxt-mapbox'],
  mapbox: {
    accessToken: 'pk.eyJ1IjoibG9pY21hc3NvbiIsImEiOiJjbHB6bWRzeXIxcHA5MnBwYmliNTFzNzZvIn0.SOMB5HeFLL7FjnMEvSkUPA'
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
