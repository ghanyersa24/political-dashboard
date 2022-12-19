<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div>
    <AtomsCardLayout>
      <div class="row">
        <div class="col-md-9 border-right">
          <h5>
            <i
              class="fas fa-arrow-left mr-3 pointer"
              @click="$router.push('/')"
            ></i>
            Request Data Sentiment
            <span v-if="false" :class="`ml-5 badge ${progressClass}`">
              Progress : {{ progress }} %
            </span>
            {{ checkeds }}
          </h5>
          <br />
          <div class="container">
            <input-text
              v-model="payload.name"
              name="Name Request"
              disabled
              placeholder="Presiden RI #1"
            />
            <input-text
              :value="daterange"
              name="Date Range"
              disabled
              placeholder="Presiden RI #1"
            />
            <input-tags name="Keyword" v-model="keywords" disabled />
          </div>
        </div>
        <div class="col-md-3">
          <h5>News Portal</h5>
          <hr />
          <input-check
            v-for="(item, i) in $store.state.NewsPortal.list"
            :key="i"
            :name="item"
            :label="item"
            check-only
            @get="(val) => getCheck(item, val)"
            val
          />
        </div>
      </div>
    </AtomsCardLayout>

    <b-tabs nav-wrapper-class="position-sticky" class="mt-3">
      <b-tab title="Twitter">
        <div class="my-3">
          <AtomsCardLayout class="h-100">
            <network-analytic />
          </AtomsCardLayout>
        </div>

        <div class="my-3">
          <AtomsCardLayout>
            <maps-chart style="height: 70vh"></maps-chart>
          </AtomsCardLayout>
        </div>

        <div class="my-3">
          <AtomsCardLayout class="h-100">
            <div class="row">
              <div class="col-md-4">
                <doughnut-chart />
              </div>
              <div class="col-md-8">
                <word-cloud />
              </div>
            </div>
          </AtomsCardLayout>
        </div>

        <div class="my-3">
          <AtomsCardLayout>
            <h6 for="Tweet">Twitter Sentiment</h6>
            <hr />
            <tweet-sentiment />
          </AtomsCardLayout>
        </div>
      </b-tab>
      <b-tab title="News Portal">
        <div class="my-3">
          <AtomsCardLayout class="h-100">
            <div class="row">
              <div class="col-md-4">
                <news-doughnut-chart />
              </div>
              <div class="col-md-8">
                <news-word-cloud />
              </div>
            </div>
          </AtomsCardLayout>
        </div>

        <div class="my-3">
          <AtomsCardLayout>
            <h6 for="news">News Sentimen</h6>
            <hr />
            <news-sentiment />
          </AtomsCardLayout>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import requestVue from '~/mixins/request.vue';
import DoughnutChart from '~/components/Diagram/Twitter/DoughnutChart.vue';
import NetworkAnalytic from '~/components/Diagram/Twitter/NetworkAnalytic.vue';
import WordCloud from '~/components/Diagram/Twitter/WordCloud.vue';
import TweetSentiment from '~/components/Diagram/Twitter/TweetSentiment.vue';
import MapsChart from '~/components/Diagram/Twitter/MapsChart.vue';
import NewsSentiment from '~/components/Diagram/News/NewsSentiment.vue';
import NewsDoughnutChart from '~/components/Diagram/News/DoughnutChart.vue';
import NewsWordCloud from '~/components/Diagram/News/WordCloud.vue';

export default {
  name: 'add-data-request-page',
  components: {
    DoughnutChart,
    NetworkAnalytic,
    WordCloud,
    TweetSentiment,
    MapsChart,
    NewsSentiment,
    NewsDoughnutChart,
    NewsWordCloud,
  },
  mixins: [requestVue],
  computed: {
    daterange() {
      return `${this.$moment(this.payload.since).format(
        'DD/MM/YYYY',
      )} - ${this.$moment(this.payload.until).format('DD/MM/YYYY')}`;
    },
    keywords() {
      return this.payload.keyword
        .split("'")
        .filter((item) => item && item !== ' ')
        .map((item) => ({ text: item }));
    },
    progressClass() {
      if (this.progress === 100) return 'badge-success';
      if (this.progress > 80) return 'badge-primary';
      if (this.progress > 50) return 'badge-warning';
      return 'badge-danger';
    },
  },
  asyncData({ store }) {
    return {
      checkeds: store.state.NewsPortal.list,
    };
  },
  data() {
    return {
      payload: {
        name: '',
        keyword: '',
        since: new Date(),
        until: new Date(),
      },
      progress: 0,
    };
  },
  created() {
    this.getQueue();
    this.getDataPortal();
  },
  methods: {
    getQueue() {
      this.requestGet({
        url: 'twitter/get-queue',
        name: 'queue twitter',
      }).then((response) => {
        const queue = response.find(
          (item) => item.id === Number(this.$route.params.id),
        );
        this.payload = queue;
        this.progress = (queue.processed / queue.counted_data) * 100;
      });
    },
    getDataPortal() {
      this.requestGet({ url: 'berita/get-portal' }).then((response) => {
        this.$store.commit('NewsPortal/init', response);
      });
    },
    getCheck(item, isChecked) {
      if (isChecked) this.checkeds.push(item);
      else {
        this.checkeds = this.checkeds.filter((check) => check !== item);
      }
    },
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
.page-item.disabled .page-link {
  background-color: unset !important;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  background-color: var(--primary);
}

.leaflet-container {
  width: 100%;
  height: 300px;
  opacity: 0;
  animation: fadeInLeaflet 1.5s ease forwards 2s;
}

@keyframes fadeInLeaflet {
  to {
    opacity: 1;
  }
}
.show-map {
  overflow: hidden;
  position: relative;
  width: inherit;
  height: 300px;
  animation: fadeInShadow 1.5s ease forwards 2s;
}

@keyframes fadeInShadow {
  0% {
    box-shadow: none;
  }
  100% {
    box-shadow: 0 0 25px 20px rgba(0, 0, 0, 0.7);
  }
}
.details-on-map {
  position: relative;
  width: 100%;
}

#map {
  position: absolute;
  top: 0;
  box-sizing: content-box;
  height: inherit;
  width: 100%;
}

.paper-map {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  perspective: 150rem;
  opacity: 0;
}

.map-side {
  box-sizing: content-box;
  width: 25vw;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.2);
  outline: 1px solid transparent;
  overflow: hidden;
}
.map-side:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 2.5rem rgba(233, 229, 220, 0.15);
  content: '';
}
.map-side:nth-of-type(1) {
  border: none;
  background-position: 0 0;
  transform: translateX(12.625vw) rotateY(-60deg);
}
.map-side:nth-of-type(2) {
  border: none;
  background-position: -25vw 0;
  transform: translateX(12.5vw) rotateY(60deg);
}
.map-side:nth-of-type(3) {
  border: none;
  background-position: -50vw 0;
  transform: translateX(-12.5vw) rotateY(-60deg);
}
.map-side:nth-of-type(4) {
  border: none;
  background-position: -75vw 0;
  transform: translateX(-12.625vw) rotateY(60deg);
}

.show-map.details-on-map {
  height: 300px;
}
.show-map #map {
  visibility: visible;
  animation: fadeIn 1s 1.75s linear forwards;
}
.show-map .paper-map {
  animation: paperMapFadeIn 0.83s ease-in forwards,
    fadeOut 1s 4s linear forwards;
}
.show-map .map-side:before {
  animation: fadeOut 0.5s 0.83s forwards ease-out;
}
.show-map .map-side:nth-of-type(1) {
  animation: openMapOuter 0.83s 0.83s linear forwards;
}
.show-map .map-side:nth-of-type(2) {
  animation: openMapInnerLeft 0.83s 0.83s linear forwards;
}
.show-map .map-side:nth-of-type(3) {
  animation: openMapInnerRight 0.83s 0.83s linear forwards;
}
.show-map .map-side:nth-of-type(4) {
  animation: openMapOuter 0.83s 0.83s linear forwards;
}

.map-side:nth-of-type(1),
.map-side:nth-of-type(3) {
  transform-origin: 100% 0;
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.3);
}

.map-side:nth-of-type(2),
.map-side:nth-of-type(4) {
  transform-origin: 0 0;
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.3);
}

@keyframes openMapOuter {
  100% {
    transform: translateX(0) rotateY(0deg);
    box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}
@keyframes openMapInnerLeft {
  0% {
    transform: translateX(12.5vw) rotateY(60deg);
  }
  20% {
    transform: translateX(10vw) rotateY(53deg);
  }
  38% {
    transform: translateX(7.75vw) rotateY(46.2deg);
  }
  50% {
    transform: translateX(6.25vw) rotateY(41.5deg);
  }
  65% {
    transform: translateX(4.375vw) rotateY(34.5deg);
  }
  75% {
    transform: translateX(3.125vw) rotateY(29deg);
  }
  83% {
    transform: translateX(2.125vw) rotateY(23.8deg);
  }
  90% {
    transform: translateX(1.25vw) rotateY(18.1deg);
  }
  95% {
    transform: translateX(0.625vw) rotateY(12.8deg);
  }
  98% {
    transform: translateX(0.25vw) rotateY(8deg);
  }
  99% {
    transform: translateX(0.125vw) rotateY(5deg);
  }
  100% {
    transform: translateX(0) rotateY(0);
    box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}
@keyframes openMapInnerRight {
  0% {
    transform: translateX(-12.5vw) rotateY(-60deg);
  }
  20% {
    transform: translateX(-10vw) rotateY(-53deg);
  }
  38% {
    transform: translateX(-7.75vw) rotateY(-46.2deg);
  }
  50% {
    transform: translateX(-6.25vw) rotateY(-41.5deg);
  }
  65% {
    transform: translateX(-4.375vw) rotateY(-34.5deg);
  }
  75% {
    transform: translateX(-3.125vw) rotateY(-29deg);
  }
  83% {
    transform: translateX(-2.125vw) rotateY(-23.8deg);
  }
  90% {
    transform: translateX(-1.25vw) rotateY(-18.1deg);
  }
  95% {
    transform: translateX(-0.625vwm) rotateY(-12.8deg);
  }
  98% {
    transform: translateX(-0.25vw) rotateY(-8deg);
  }
  99% {
    transform: translateX(-0.125vw) rotateY(-5deg);
  }
  100% {
    transform: translateX(0) rotateY(0);
    box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes paperMapFadeIn {
  0% {
    transform: scale(0, 0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.leaflet-popup .leaflet-popup-close-button {
  display: none;
}
.leaflet-popup .leaflet-popup-content-wrapper {
  background: linear-gradient(#000, #111);
  border: groove 1px #fff;
  overflow: hidden;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  -webkit-transform: translate(-50%, -100%);
  position: absolute;
  animation: fadeInPopup 1s ease-out;
}
@keyframes fadeInPopup {
  0% {
    opacity: 0;
    height: 0;
    width: 0;
  }
  50% {
    opacity: 1;
    height: 0;
    width: 310px;
  }
  100% {
    opacity: 1;
    height: 100px;
    width: 310px;
  }
}
.leaflet-popup .leaflet-popup-content-wrapper .leaflet-popup-content {
  width: 300px;
  height: 100px;
  text-align: center;
  padding: 0;
  margin: 0 0 0 10px;
  overflow: hidden;
}
.leaflet-popup .leaflet-popup-content-wrapper .leaflet-popup-content div {
  height: 100%;
}
.leaflet-popup
  .leaflet-popup-content-wrapper
  .leaflet-popup-content
  div
  .caption {
  color: #f1f1f1;
  height: 100%;
  white-space: nowrap;
}
.leaflet-popup .leaflet-popup-content-wrapper .leaflet-popup-content div hr {
  border: groove 1.35px #fff;
  box-shadow: 0 0 3px #000;
}
.leaflet-popup .leaflet-popup-content-wrapper .leaflet-popup-content div svg {
  float: left;
  height: 120px;
  width: 120px;
  fill: #f1f1f1;
}
</style>
