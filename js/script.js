import { JSON_DATA } from './json_data.js';

const chartHeader = document.querySelector('.chart-section-header');

const BARCHART = document.createElement('div');
BARCHART.classList.add('charts');

BARCHART.innerHTML = `
    <div class="mon chart"></div>
    <div class="tue chart"></div>
    <div class="wed chart"></div>
    <div class="thu chart"></div>
    <div class="fri chart"></div>
    <div class="sat chart"></div>
    <div class="sun chart"></div>
`;

chartHeader.after(BARCHART);
renderChart();

function renderChart() {
  const expensesChart = document.querySelectorAll('.chart');
  expensesChart.forEach((charts) => {
    JSON_DATA.forEach((data) => {
      if (charts.classList[0] !== data.day) return;

      charts.style.height = `${data.amount * 3}px`;
      charts.classList.add('bar-chart');
      renderMaxChart(expensesChart);

      const day = document.createElement('p');
      day.classList.add('day');
      charts.appendChild(day);
      day.textContent = data.day;

      addExpenseTag({ chartEl: expensesChart, json: JSON_DATA });
    });
  });
}

function renderMaxChart(maxChart) {
  const expenses = JSON_DATA.map((expense) => expense.amount);
  const max = Math.max(...expenses);

  JSON_DATA.forEach((data) => {
    if (data.amount !== max) return;

    maxChart.forEach((chart) => {
      if (chart.classList[0] === data.day) {
        chart.classList.add('bar-chart-active');
      }
    });
  });
}

function addExpenseTag({ chartEl, json }) {
  chartEl.forEach((el) => {
    const tag = document.createElement('div');
    tag.classList.add('expense-tag');

    el.addEventListener('mouseenter', () => {
      json.forEach((data) => {
        if (el.classList[0] !== data.day) return;

        el.append(tag);
        tag.textContent = `$${data.amount}`;

        if (el.classList.contains('wed')) el.classList.add('max-chart-fade');
        else el.classList.add('chart-fade');

        removeExpenseTag({ tag, chartEl });
      });
    });
  });
}

function removeExpenseTag({ chartEl, tag }) {
  chartEl.forEach((el) => {
    el.addEventListener('mouseleave', () => {
      chartEl.forEach((_) => {
        tag.remove();
        if (el.classList.contains('wed')) el.classList.remove('max-chart-fade');
        else el.classList.remove('chart-fade');
      });
    });
  });
}
