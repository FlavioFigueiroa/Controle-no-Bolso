import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import styles from './Dashboard.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [despesas, setDespesas] = useState([]);
  const [periodo, setPeriodo] = useState("mensal");

  useEffect(() => {
    fetch("http://localhost:5000/despesas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setDespesas(data))
      .catch((error) => console.error("Erro ao buscar despesas:", error));
  }, []);

  const filtrarPorPeriodo = (periodo) => {
    const hoje = new Date();
    return despesas.filter((despesa) => {
      const dataDespesa = new Date(despesa.data);
      if (periodo === "mensal") {
        return (
          dataDespesa.getMonth() === hoje.getMonth() &&
          dataDespesa.getFullYear() === hoje.getFullYear()
        );
      }
      if (periodo === "semanal") {
        const umaSemanaAtras = new Date();
        umaSemanaAtras.setDate(hoje.getDate() - 7);
        return dataDespesa >= umaSemanaAtras && dataDespesa <= hoje;
      }
      if (periodo === "anual") {
        return dataDespesa.getFullYear() === hoje.getFullYear();
      }
      return true;
    });
  };

  const calcularTotal = (tipo) => {
    return filtrarPorPeriodo(periodo)
      .filter((despesa) => despesa.category.name === tipo)
      .reduce((acc, despesa) => acc + parseFloat(despesa.valor), 0);
  };

  const prepararDadosParaGrafico = () => {
    const despesasFiltradas = filtrarPorPeriodo(periodo);
    const porCategoria = despesasFiltradas.reduce((acc, despesa) => {
      const categoria = despesa.category.name;
      acc[categoria] = (acc[categoria] || 0) + parseFloat(despesa.valor);
      return acc;
    }, {});

    return {
      labels: Object.keys(porCategoria),
      datasets: [
        {
          label: "Valores por Categoria",
          data: Object.values(porCategoria),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };
  };

  const dadosLinha = () => {
    const despesasFiltradas = filtrarPorPeriodo(periodo);
    const porData = despesasFiltradas.reduce((acc, despesa) => {
      const data = new Date(despesa.data).toLocaleDateString("pt-BR");
      acc[data] = (acc[data] || 0) + parseFloat(despesa.valor);
      return acc;
    }, {});

    return {
      labels: Object.keys(porData),
      datasets: [
        {
          label: "Despesas ao longo do tempo",
          data: Object.values(porData),
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    };
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard Financeiro</h1>

      {/* Controle de Período */}
      <div className={styles.periodoSelect}>
        <label>Selecione o Período:</label>
        <select onChange={(e) => setPeriodo(e.target.value)} value={periodo}>
          <option value="mensal">Mensal</option>
          <option value="semanal">Semanal</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      {/* Indicadores Totais */}
      <div className={styles.indicadores}>
        <div className={styles.indicador}>
          <h3>Total de Despesas</h3>
          <p>R$ {calcularTotal("Despesa").toFixed(2)}</p>
        </div>
        <div className={styles.indicador}>
          <h3>Total de Receitas</h3>
          <p>R$ {calcularTotal("Receita").toFixed(2)}</p>
        </div>
        <div className={styles.indicador}>
          <h3>Saldo do Mês</h3>
          <p>R$ {(calcularTotal("Receita") - calcularTotal("Despesa")).toFixed(2)}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className={styles.graficos}>
        <h3>Distribuição por Categoria</h3>
        <Bar data={prepararDadosParaGrafico()} options={{ responsive: true }} />

        <h3>Despesas ao Longo do Tempo</h3>
        <Line data={dadosLinha()} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default Dashboard;
