import styles from './Despesa.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
import Message from "../layout/Message"
import DespesaForm from "../Project/DespesasForm"

function Despesa(){

    const {id} = useParams()

    const [despesa, setDespesa] = useState([])
    const [showDespesaForm, setShowDespesaForm] = useState(false)
    const [type, setType] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/despesas/${id}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setDespesa(data)
            })
            .catch((err) => console.log)
        }, 300)
    }, [id])

    function toggleDespesaForm(){
        setShowDespesaForm(!showDespesaForm)
    }

    function editPost(despesa){
        //buget validation
        fetch(`http://localhost:5000/despesas/${id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify(despesa),
        })
        .then(resp => resp.json())
        .then((data) => {
            setDespesa(data)
            setShowDespesaForm(false)
            setMessage('Despesa/Receita atualizada!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {despesa.descricao ? (
                <div className={styles.despesa_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Despesa/Receita: {despesa.descricao}</h1>
                            <button className={styles.btn} onClick={toggleDespesaForm}>{!showDespesaForm ? 'Editar Despesa/Receita' : 'Fechar'}</button>
                            {!showDespesaForm ? (
                                <div className={styles.despesa_info}>
                                    <p>
                                        <span>Data:</span> {despesa.data}
                                    </p>
                                    <p>
                                        <span>Valor:</span> R${despesa.valor}
                                    </p>
                                    <p>
                                        <span>Categoria:</span> {despesa.category.name}
                                    </p>
                                </div>

                            ) : (
                                <div className={styles.despesa_info}>
                                    <DespesaForm handleSubmit={editPost} btnText="Concluir edição" despesaData={despesa} />
                                </div>
                            )}                        
                        </div>
                    </Container>
                </div> 
            ): (<Loading /> 
            )}
        </>
    )
}

export default Despesa