import { useState } from "react";
import styles from './Cadastro.module.css'; // Importando o arquivo de CSS modular

function Cadastro() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!firstName || !lastName || !cpf || !dob || !email || !monthlyIncome || !password) {
      setMessage("Preencha todos os campos.");
      return;
    }

    try {
      // Enviar os dados de cadastro para o json-server
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          cpf,
          dob,
          email,
          monthlyIncome: parseFloat(monthlyIncome),
          password,
        }),
      });

      if (response.ok) {
        setMessage("Usuário cadastrado com sucesso!");
      } else {
        setMessage("Erro ao cadastrar.");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2>Cadastro de Usuário</h2>
        {message && <p className={message === "Usuário cadastrado com sucesso!" ? styles.success : ""}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label>Sobrenome:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <label>CPF:</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />

          <label>Data de Nascimento:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

          <label>E-mail:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Renda Mensal:</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} required />

          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
