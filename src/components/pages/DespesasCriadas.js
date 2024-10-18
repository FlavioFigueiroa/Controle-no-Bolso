import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Message from "../layout/Message"

import styles from './DespesasCriadas.module.css'
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"
import DespesaCards from "../Project/DespesaCards"

function DespesasCriadas(){
    const [despesas, setDespesas] = useState([])

    const location = useLocation()
    let message= ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/despesas',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setDespesas(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div className={styles.despesas_container}>
            <div className={styles.tittle_container}>
                <h1> Minhas Despesas/Receitas</h1>
                <LinkButton to="/despesas" text="Adicionar Despesas/Receitas"></LinkButton>
            </div>
            
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                
            </Container>
        </div>
    )
}
//{despesas.length > 0 &&
//despesas.map((despesa) => (
//    <DespesaCards descricao={despesa.descricao} />
//))}
export default DespesasCriadas