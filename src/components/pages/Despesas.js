import { useNavigate } from 'react-router-dom'
import DespesasForm from "../Project/DespesasForm"

import styles from './Despesas.module.css'

function Despesas(){

    const navigate  = useNavigate()

    function createPost(despesa){

        fetch('http://localhost:5000/despesas', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(despesa)
        }).then((resp) => resp.json)
        .then((data) => {
            console.log(data)
            //redirect
            navigate('/despesasCriadas', {message: "Despesa/Receita adicionada com sucesso!"})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.despesas_container}>
            <h1>Adicionar Despesas e Receitas</h1>
            <p>Adicione os seus gastos e entradas para ter uma visão geral financeira</p>
            <DespesasForm handleSubmit={createPost} btnText="Adicionar"/>
        </div>
    )
}

export default Despesas