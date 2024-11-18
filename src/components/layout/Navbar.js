import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './Navbar.module.css';
import logo from '../../img/Logo horizontal2.png';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to='/'>
                    <img src={logo} alt='Controle no Bolso' width="300" height="150" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li>
                    <li className={styles.item}><Link to='/dashboard'>Dashboard</Link></li>
                    <li className={styles.item}><Link to='/metas-financeiras'>Metas Financeiras</Link></li>
                    <li className={styles.item}><Link to='/infos'>Infos</Link></li>
                    <li className={styles.item}><Link to='/despesasCriadas'>Despesas/Receitas</Link></li>
                </ul>
                <div className={styles.authLinks}>
                    <Link to='/login' className={`${styles.loginButton}`}>Entrar</Link>
                    <Link to='/cadastro' className={`${styles.registerButton}`}>Cadastro</Link>
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;
