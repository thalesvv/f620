google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 't');
  data.addColumn({type: 'number', label: 'y₁(t) = cos( √k t) + sen( √(3k) t)'});
  data.addColumn({type: 'number', label: 'y₂(t) = cos( √k t) - sen( √(3k) t)'});

  //   Definições de variáveis
  let k = Number(prompt(`Digite o valor de k:`));
  let t = 0;
  let periodo = Number(prompt(`Digite o número de períodos desejado (valor sem o ${String.fromCharCode(960)}):`));
  let dataArrayTime = [];
  let dataArrayY1 = [];
  let dataArrayY2 = [];

  for(t=0; t<=2*periodo*Math.PI; t+=Math.PI/1000) {
    dataArrayTime.push(t)
    dataArrayY1.push(y1(t, k))
    dataArrayY2.push(y2(t, k))
  }

  data.addRows([
    ...dataArrayTime.map((t, index) => [t, dataArrayY1[index], dataArrayY2[index]])
  ]);

  var options = {
    title: `Gráfico de y1(t) e y2(t) obtidos com k = ${k} e período = ${2*periodo} ${String.fromCharCode(960)}`,
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

function y1 (t, k) {
    return Math.cos(Math.sqrt(k)*t) + Math.sin(Math.sqrt(3*k)*t); 
}
function y2 (t, k) {
    return Math.cos(Math.sqrt(k)*t) - Math.sin(Math.sqrt(3*k)*t); 
}


// Recarrega a página ao redimensionar  
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        location.reload();
    }, 300);
});

