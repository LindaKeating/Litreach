<template>
  <div class="container GameDayEnded">
    <apexchart
      v-if="this.dailyAverages().length > 0"
      width="100%"
      type="line"
      :options="chartOptions"
      :series="this.series"
    ></apexchart>
    <p 
      v-else
      class="GameDayEnded-NoData">Níl teacht ar shonraí go fóill</p>
    <div class="GameDayEnded-NextLetters d-grid gap-2 mt-4">
      <p class="GameDayEnded-CeadLitreadhEile text-center">An chéad LITREACH eile</p>
      <countdown 
        :class="'text-center'"
        :counting="true"
        :time="time" 
        v-slot="{ hours, minutes, seconds }">
        <div class="GameDayEnded-TimeContainer">
          <div>
          <div class="GameDayEnded-Number">
            {{ hours }}<span>:</span>
          </div>
          <div class="GameDayEnded-Time">
            uair
          </div>
        </div>
        <div>
          <div class="GameDayEnded-Number">
            {{ minutes }}<span>:</span>
          </div>
          <div class="GameDayEnded-Time">
            bomaite
          </div>
        </div>
        <div>
          <div class="GameDayEnded-Number">
            {{ seconds }}
          </div>
          <div class="GameDayEnded-Time">
            soicind
          </div>
        </div>
        </div>
      </countdown>
      <button 
        @click="copyToClipBoard"
        title="Cóipeáil chuig an ghearrthaisce"
        class="btn btn-secondary btn-block mt-3">Roinn</button>
    </div>
    
    

<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->
  </div>
</template>
<script>
  import { convertAttemptsToStars } from '../clipboard.js';
  import VueApexCharts from "vue3-apexcharts";
  import VueCountdown from '@chenfengyuan/vue-countdown';
  import { dictionary } from '../dictionary';

  export default {
    props: {
      statistics: Object,
      todaysAttempt: Array,
      darkMode: Boolean
    },
    data() {
      return {
        dictionary: dictionary
      }
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
          dailyAverages.push(sumOfDayAttempts / 5 );
        }
        return dailyAverages;
      },
      dailyLabels() {
        let dailyLabels = [];
        for (const [key, value ] of Object.entries(this.statistics)) {
          dailyLabels.push('Lá: ' + key.toString());
        }
        return dailyLabels;
      },
      copyToClipBoard() {
        let shareString = '#Litreach #' + new Date().getDOY() + ' \x0A';
        this.todaysAttempt.forEach(function(element) {
          let c = element.attempts.toString();
          shareString += convertAttemptsToStars(c);   
        });
        shareString += "https://litreach.ie";

        navigator.clipboard.writeText(shareString).then((result) => {
          this.$toast.info(`Tá na torthaí cóipeáilte chuig an ghearrthaisce `, {
            position: 'top'
          }, function () {
            console.log('heuston there was a problem')
          })
        })
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
            width: '100%;',
            zoom: {
              enabled: false
            },
            toolbar: { show: false }
          },
          colors: ['#ffd400'],
          grid: {
            show: false
          },
          xaxis: {
            categories: this.dailyLabels(),
          },
          yaxis: {
            title: 'daily %'
          },
          tooltip: {
            y: {
              title: {
                formatter: (seriesName) => '%',
              }
            },
            x: {
              show: false
            }
          },
          legend: {
            show: false
          },
          theme: {
            mode: this.darkMode ? 'dark': 'light',
            palette: 'palette10',
          },
          yaxis: {
            max: 100
          }
        },
        series: [{
          name: "Litreach",
          data: this.dailyAverages()
        }],
        time: diff
      };
    },
  }
</script>
<style scoped lang="scss">
  .GameDayEnded {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-NoData {
      text-align: center;
    }

    &-TimeContainer {
      display: flex;
      justify-content: center;
    }

    &-CeadLitreadhEile {
      margin-bottom: 0;
    }

    &-Number {
      font-size: 2.5rem;
      line-height: 2.5rem;
      font-weight: 700;
    }

    &-Time {
      white-space: pre;
    }

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