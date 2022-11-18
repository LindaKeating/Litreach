<template>
  <div>
    <apexchart
      width="100%"
      type="line"
      height="auto"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <p>An Chéad Litreach Eile</p>
    <countdown 
      :counting="true"
      :time="time" 
      v-slot="{ hours, minutes, seconds }">
      {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
    </countdown>
    <button 
      @click="copyToClipBoard"
      class="btn">ROINN</button>
<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->
  </div>
</template>
<script>
  import { updateClipboard } from '../clipboard.js';
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
        this.todaysAttempt.reverse().forEach(function(element) {
          if(element.answer) {
            switch(element.attempts) {
              case 5:
                shareString += '❌❌❌❌❌ \x0A';
              case 4: 
                shareString += '⭐❌❌❌❌ \x0A';
              case 3: 
                shareString += '⭐⭐❌❌❌ \x0A';
              case 2: 
                shareString += '⭐⭐⭐❌❌ \x0A';
              case 1: 
                shareString += '⭐⭐⭐⭐❌ \x0A';
              default:
                shareString += '⭐⭐⭐⭐⭐ \x0A';
            }
          } else {
            shareString += '----- \x0A';
          }
        });
        navigator.permissions.query({name: "clipboard-write"}).then((result) => {
          if (result.state === "granted" || result.state === "prompt") {
            console.log('share String to Navigator', shareString);
            navigator.clipboard
            .writeText(shareString)
            .then(() => {
              alert("successfully copied");
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
            background: '#000',
            foreColor: '#000',
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

  .vue-apexcharts {
    overflow: scroll;
  }
</style>