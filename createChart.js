const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function createChart(data, options = {}) {
  const { width = 400, height = 300 } = options;

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColor: 'white'
  });

  const configuration = {
    type: 'bar',
    data: {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'عدد المستخدمين',
          data: data.map(item => item.users),
          backgroundColor: 'blue'
        },
        {
          label: 'الإيرادات',
          data: data.map(item => item.revenue),
          backgroundColor: 'orange'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      }
    }
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  return imageBuffer;
}

// تصدير الدالة
module.exports = createChart;
