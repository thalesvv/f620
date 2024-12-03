document.addEventListener("DOMContentLoaded", () => {
  // Parâmetros do problema
  const pi = Math.PI;
  const larguraPlaca = 1; // metros
  const comprimentoPlaca = 1; // metros
  const constanteTermica = 1 / pi; // Constante térmica

  // Valores de n e m para plotar
  const valoresN = [1, 3, 5, 7];
  const valoresM = [1, 3, 5, 7];

  // Tempos para plotar
  const tempos = [0, 1, 2, 5]; // segundos

  // Resolução da grade
  const resolucao = 30; // número de pontos

  // Função para calcular a curva
  function geraValores({ x, y, t }) {
    return valoresN
      .map((n) =>
        valoresM.map(
          (m) =>
            (1600 / pi ** 2) *
            (1 / (n * m)) *
            Math.sin((n * pi * x) / larguraPlaca) *
            Math.sin((m * pi * y) / comprimentoPlaca) *
            Math.exp(
              -(constanteTermica ** 2) *
                t *
                (((n * pi) / larguraPlaca) ** 2 +
                  ((m * pi) / comprimentoPlaca) ** 2)
            )
        )
      )
      .flat()
      .reduce((acc, curr) => acc + curr, 0);
  }

  // Gera os dados para um tempo específico
  function generateData(t) {
    const x = Array.from(
      { length: resolucao },
      (_, i) => (i / (resolucao - 1)) * larguraPlaca
    );
    const y = Array.from(
      { length: resolucao },
      (_, i) => (i / (resolucao - 1)) * comprimentoPlaca
    );
    const z = x.map((_, i) =>
      y.map((_, j) => geraValores({ x: x[i], y: y[j], t }))
    );

    return { x, y, z };
  }

  // Função para plotar o gráfico 3D
  function plotGraph(t, divId) {
    const data = generateData(t);
    const plotData = [
      {
        x: data.x,
        y: data.y,
        z: data.z,
        type: "surface",
        colorscale: "Viridis",
        showscale: true,
      },
    ];

    const layout = {
      title: `Distribuição de Temperatura em t = ${t}s`,
      scene: {
        xaxis: { title: "x (metros)" },
        yaxis: { title: "y (metros)" },
        zaxis: { title: "Temperatura (°C)", range: [0, 100] },
      },
    };

    Plotly.newPlot(divId, plotData, layout);
  }

  // Plotar os gráficos para os tempos especificados
  tempos.forEach((t) => plotGraph(t, `plot-t${t}`));
});
