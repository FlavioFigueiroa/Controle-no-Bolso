import { useState } from "react";
import styles from './Login.module.css'; // Importando o arquivo de CSS modular

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        setMessage("Login bem-sucedido!");
      } else {
        setMessage("E-mail ou senha incorretos!");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        {message && <p className={message === "Login bem-sucedido!" ? styles.success : ""}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
