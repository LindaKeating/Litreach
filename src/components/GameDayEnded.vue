<template>
  <div>
    <apexchart
      width="500"
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
  import VueApexCharts from "vue3-apexcharts";
  export default {
    props: {
      statistics: Object
    },
    components: {
      apexchart: VueApexCharts,
    },
    methods: {
      dailyAverages() {
        let dailyAverages = [];
        for (const [key, value] of Object.entries(this.statistics)) {
          let dayAttempts = []
          for (var i = 0; i < 5; i++) {
            if (value[i].attempts) {
              dayAttempts.push((5 / value[i].attempts) * 100)
            }  
          }
          let sumOfDayAttempts = dayAttempts.reduce((a, b) => a + b, 0);
          dailyAverages.push(sumOfDayAttempts / 5);
        }
        return dailyAverages;
      }
    },
    data: function() {
      return {
        chartOptions: {
          chart: {
            height: 350,
            id: "vuechart-example",
            type: 'line',

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
      };
    },
  }
</script>
<style scoped lang="scss">

  .vue-apexcharts {
    overflow: scroll;
  }
</style>