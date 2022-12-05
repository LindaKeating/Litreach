<template>
  <div class="container GameDayEnded">
    <apexchart
      width="100%"
      type="line"
      height="auto"
      :options="chartOptions"
      :series="this.series"
    ></apexchart>
    <div class="GameDayEnded-NextLetters d-grid gap-2 mt-4">
      <p class="GameDayEnded-CeadLitreadhEile text-center">An Chéad Litreach Eile</p>
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
      todaysAttempt: Array
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
          dailyAverages.push(sumOfDayAttempts / 5);
        }
        return dailyAverages;
      },
      dailyLabels() {
        let dailyLabels = [];
        for (const [key, value ] of Object.entries(this.statistics)) {
          dailyLabels.push(key.toString());
        }
        return dailyLabels;
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
            height: 350,
            zoom: {
              enabled: false
            },
            toolbar: { show: false }
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: this.dailyLabels(),
          },
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