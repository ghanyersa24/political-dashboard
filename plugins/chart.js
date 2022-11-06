import Vue from 'vue';
import { Line, Pie, Doughnut } from 'vue-chartjs/legacy';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
);

Vue.component('line-chart', {
  extends: Line,
});
Vue.component('pie-chart', {
  extends: Pie,
});
Vue.component('doughnut-chart', {
  extends: Doughnut,
});
