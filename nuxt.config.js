export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  server: {
    host: '0',
  },
  head: {
    title: 'Sentiment Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
      }],
    script: [
      { src: 'https://code.jquery.com/jquery-3.4.1.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' },
      { src: 'https://cdn.jsdelivr.net/gh/emn178/chartjs-plugin-labels/src/chartjs-plugin-labels.js' },
      { src: 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.1.0' },
      { src: '/assets/js/off-canvas.js' },
      { src: '/assets/js/hoverable-collapse.js' },
      { src: '/assets/js/misc.js' },
    ],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/style.css', '@/assets/css/vendor.css', '@/assets/css/spinkit.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-tags-input', ssr: false },
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/leaflet.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Component Loading
  loading: '~/components/Loading.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],
  moment: {
    locales: ['id'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
  ],
  toast: {
    position: 'bottom-center',
    duration: 2500,
    action: {
      text: 'close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://service.shiftacademy.id/api',
  },
  router: {
    middleware: ['maintenance'],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
        },
        user: {
          property: 'data',
        },
        endpoints: {
          login: {
            url: '/login',
            method: 'POST',
          },
          user: {
            url: '/users',
          },
          logout: false,
        },
        redirect: {
          login: '/login',
          logout: '/login',
          callback: '/login',
          home: '/',
        },
      },
    },
  },
};
