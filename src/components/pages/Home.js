import styles from './Home.module.css'
import imageHome from '../../img/home.png'
import LinkButton from '../layout/LinkButton'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>Controle no Bolso</span></h1>
            <p>Inicie a sua jornada para uma vida finenceira mais organizada!</p>
            <LinkButton to="/despesas" text="Adicionar Despesas/Receitas"></LinkButton>
            <img src={imageHome} alt="Controle no Bolso" />
        </section>
    )
}

export default Home