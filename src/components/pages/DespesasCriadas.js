import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Message from "../layout/Message"
import Loading from "../layout/Loading"

import styles from './DespesasCriadas.module.css'
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"
import DespesaCards from "../Project/DespesaCards"

function DespesasCriadas(){
    const [despesas, setDespesas] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [despesaMessage, setDespesaMessage] = useState('')

    const location = useLocation()
    let message= ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('https://json-cnb.vercel.app/despesas',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setDespesas(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, 500)
    }, [])

    function removeDespesa(id){
        fetch(`https://json-cnb.vercel.app/despesas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() => {
            setDespesas(despesas.filter((despesa) => despesa.id !== id))
            setDespesaMessage('Projeto Removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.despesasCriadas_container}>
            <div className={styles.tittle_container}>
                <h2> Minhas Despesas/Receitas</h2>
                <LinkButton to="/despesas" text="Adicionar Despesas/Receitas"></LinkButton>
            </div>
            
            {message && <Message type="success" msg={message} />}
            {despesaMessage && <Message type="success" msg={despesaMessage} />}
            <Container customClass="start">
                {despesas.length > 0 &&
                    despesas.map((despesa) => <DespesaCards 
                    id={despesa.id}
                    descricao={despesa.descricao}
                    data={despesa.data}
                    valor={despesa.valor}
                    category={despesa.category.name}
                    key={despesa.id}
                    handleRemove={removeDespesa}
                />)}
                {!removeLoading && <Loading />}
                {removeLoading && despesas.length === 0 && (
                    <p>Não há despesas/receitas cadastradas!</p>
                )}
            </Container>
        </div>
    )
}

export default DespesasCriadas