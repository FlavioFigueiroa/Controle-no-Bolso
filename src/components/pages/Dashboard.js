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
import saldoPositivoImg from '../../img/Dinheiro_positivo.png'; // Imagem para saldo positivo
import saldoNegativoImg from '../../img/Dinheiro_negativo.png'; // Imagem para saldo negativo
import saldoNeutroImg from '../../img/Dinheiro_Neutro.png'; // Imagem para saldo neutro

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
  const [metas, setMetas] = useState({ receita: 0, despesa: 0 });
  const [periodo, setPeriodo] = useState("mensal");

  useEffect(() => {
    fetch("http://localhost:5000/despesas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.ok ? response.json() : Promise.reject('Erro ao buscar despesas'))
      .then((data) => setDespesas(data))
      .catch((error) => console.error("Erro ao buscar despesas:", error));

    fetch("http://localhost:5000/metas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.ok ? response.json() : Promise.reject('Erro ao buscar metas'))
      .then((data) => setMetas(data))
      .catch((error) => console.error("Erro ao buscar metas:", error));
  }, []);

  const filtrarPorPeriodo = (periodo) => {
    const hoje = new Date();
    return despesas.filter((despesa) => {
      const dataDespesa = new Date(despesa.data);
      if (periodo === "mensal") {
        return dataDespesa.getMonth() === hoje.getMonth() && dataDespesa.getFullYear() === hoje.getFullYear();
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

  const graficoMetas = () => {
    const despesasFiltradas = filtrarPorPeriodo(periodo);
    const porMes = despesasFiltradas.reduce((acc, despesa) => {
      const dataDespesa = new Date(despesa.data);
      const mesAno = `${dataDespesa.getMonth() + 1}/${dataDespesa.getFullYear()}`;

      if (!acc[mesAno]) {
        acc[mesAno] = { receita: 0, despesa: 0 };
      }

      if (despesa.category.name === "Receita") {
        acc[mesAno].receita += parseFloat(despesa.valor);
      } else if (despesa.category.name === "Despesa") {
        acc[mesAno].despesa += parseFloat(despesa.valor);
      }

      return acc;
    }, {});

    const meses = Object.keys(porMes);
    return {
      labels: meses,
      datasets: [
        {
          label: "Receita Realizada",
          data: meses.map((mes) => porMes[mes]?.receita || 0),
          backgroundColor: "#4CAF50",
        },
        {
          label: "Despesa Realizada",
          data: meses.map((mes) => porMes[mes]?.despesa || 0),
          backgroundColor: "#F44336",
        },
      ],
    };
  };

  const saldoAcumulado = () => {
    const despesasFiltradas = filtrarPorPeriodo(periodo);
    let saldo = 0;
    const acumulado = despesasFiltradas.map((despesa) => {
      saldo += despesa.category.name === "Receita" ? parseFloat(despesa.valor) : -parseFloat(despesa.valor);
      return saldo;
    });

    const datas = despesasFiltradas.map((despesa) =>
      new Date(despesa.data).toLocaleDateString("pt-BR")
    );

    return {
      labels: datas,
      datasets: [
        {
          label: "Saldo Acumulado",
          data: acumulado,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const analiseSaldo = () => {
    const saldoMes = calcularTotal("Receita") - calcularTotal("Despesa");

    if (saldoMes < 0) {
      return "Seu saldo está negativo. É recomendado reduzir os gastos e tentar poupar mais dinheiro.";
    } else if (saldoMes > 0) {
      return "Você está com um saldo positivo! Considere investir ou poupar para o futuro.";
    } else {
      return "Seu saldo está equilibrado. Continue controlando seus gastos.";
    }
  };
    const saldoTotal = () => {
        const receitaTotal = calcularTotal("Receita");
        const despesaTotal = calcularTotal("Despesa");
        return receitaTotal - despesaTotal;
    };
    
    // Lógica para exibir a imagem com base no saldo
    const imagemSaldo = () => {
        const saldo = saldoTotal();
        if (saldo > 0) {
          return saldoPositivoImg;  // Exibe a imagem de saldo positivo
        } else if (saldo < 0) {
          return saldoNegativoImg;  // Exibe a imagem de saldo negativo
        }
        return saldoNeutroImg;      // Exibe a imagem de saldo neutro
      };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardConteudo}>
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
            <h3>Resultado total</h3>
            <p>R$ {(calcularTotal("Receita") - calcularTotal("Despesa")).toFixed(2)}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className={styles.graficos}>
          <h3>Distribuição por Categoria</h3>
          <Bar data={prepararDadosParaGrafico()} options={{ responsive: true }} />

          <h3>Despesas ao Longo do Tempo</h3>
          <Line data={dadosLinha()} options={{ responsive: true }} />

          <h3>Metas vs. Realidade</h3>
          <Bar data={graficoMetas()} options={{ responsive: true }} />

          <h3>Saldo Acumulado</h3>
          <Line data={saldoAcumulado()} options={{ responsive: true }} />
        </div>
      </div>

        {/* Análise de Saldo */}
        <div className={styles.relatorio}>
        <h3>Análise do Saldo do Mês</h3>
        <img src={imagemSaldo()} alt="Imagem de análise do saldo" className={styles.imagemAnalise} />
        <p>
          {saldoTotal() > 0 ? "Você está com um saldo positivo! Continue assim!" :
          saldoTotal() < 0 ? "Seu saldo está negativo. Tente reduzir os gastos e poupar mais!" :
          "Seu saldo está neutro. Tente equilibrar suas receitas e despesas."}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
