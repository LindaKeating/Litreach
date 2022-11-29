<template>
  <div class="container">
    <apexchart
      width="100%"
      type="line"
      height="auto"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div class="GameDayEnded-NextLetters">
      <p class="text-center">An Chéad Litreach Eile</p>
      <countdown 
        :class="'text-center'"
        :counting="true"
        :time="time" 
        v-slot="{ hours, minutes, seconds }">
        {{ hours }} uair, {{ minutes }} bomaite, {{ seconds }} soicind.
      </countdown>
      <button 
        @click="copyToClipBoard"
        class="btn btn-secondary btn-block mt-3">ROINN</button>
    </div>
    
    

<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->
  </div>
</template>
<script>
  import { convertAttemptsToStars } from '../clipboard.js';
  import VueApexCharts from "vue3-apexcharts";
  import VueCountdown from '@chenfengyuan/vue-countdown';

  export default {
    props: {
      statistics: Object,
      todaysAttempt: Array
    },
    components: {
      apexchart: VueApexCharts,
      countdown: VueCountdown
    },
    methods: {
      dailyAverages() {
        let dailyAverages = [];
        for (const [key, value] of Object.entries(this.statistics)) {
          let dayAttempts = []
          for (var i = 0; i < 5; i++) {
           
            if (value[i].answer) {
              let attemptScore = 5 - value[i].attempts;
              dayAttempts.push((attemptScore / 5) * 100)
            }  
          }
          let sumOfDayAttempts = dayAttempts.reduce((a, b) => a + b, 0);
          dailyAverages.push(sumOfDayAttempts / 5);
        }
        return dailyAverages;
      },
      copyToClipBoard() {
        let shareString = '#Litreach \x0A';
        this.todaysAttempt.forEach(function(element) {
          let c = element.attempts.toString();
          shareString += convertAttemptsToStars(c);   
        });
        navigator.permissions.query({name: "clipboard-write"}).then((result) => {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard
            .writeText(shareString)
            .then(() => {
              this.$toast.info(`Tá do torthaí cóipeálta chuig an clipboard `, {
                position: 'top'
              });
            })
            .catch(() => {
              alert("something went wrong");
            });
          }
        }); 
      }
    },
    data: function() {
      var now = new Date(),
      tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,0,0),
        diff = tomorrow.getTime() - now.getTime();

      return {
        chartOptions: {
          chart: {
            id: "vuechart-example",
            type: 'line',
            markers: {
              size: 0,
            },
            grid: {
              colors: ['#e5e5e5', 'transparent'],
              opacity: 0.5
            },
            toolbar: {
              show: false
            },
            sparkline: {
              enabled: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            categories: [1],
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
        },
        series: [
          {
            name: "Litreach",
            data: this.dailyAverages(),
          },
        ],
        time: diff
      };
    },
  }
</script>
<style scoped lang="scss">
  .GameDayEnded {
    &-NextLetters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .vue-apexcharts {
    overflow: scroll;
  }
</style>