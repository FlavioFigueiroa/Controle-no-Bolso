import {Link} from 'react-router-dom'
import styles from './DespesaCards.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function DespesaCards({id, descricao, data, valor, category, handleRemove}){
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return (
        <div className={styles.despesa_card}>
            <h4>{descricao}</h4>
            <p>
                <span>Valor:</span> R${valor}
            </p>
            <p>
                <span>Data:</span> {data}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.despesa_card_actions}>
                <Link to={`/despesa/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div> 
        </div>
    )
}

export default DespesaCards