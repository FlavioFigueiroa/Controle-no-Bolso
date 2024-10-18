import{ Link } from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/Logo horizontal2.png'
//                     <li className={styles.item}><Link to='/despesas'>Adicionar Despesas</Link></li>
function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to='/'>
                    <img src={logo} alt='Controle no Bolso' width="300" height="150"></img>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li>
                    <li className={styles.item}><Link to='/dashboard'>Dashboard</Link></li> 
                    <li className={styles.item}><Link to='/metas-financeiras'>Metas Financeiras</Link></li>
                    <li className={styles.item}><Link to='/infos'>Infos</Link></li>
                    <li className={styles.item}><Link to='/despesasCriadas'>Despesas/Receitas</Link></li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar