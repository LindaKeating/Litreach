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
    components: {
      apexchart: VueApexCharts,
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
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
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
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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