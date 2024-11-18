import {Link} from 'react-router-dom'
import styles from './MetaCards.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function MetaCards({id, nomeMeta, valorMeta, dataConclusao, valorMensal, handleRemove}){
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return (
        <div className={styles.despesa_card}>
            <h4>{nomeMeta}</h4>
            <p>
                <span>Valor:</span> R${valorMeta}
            </p>
            <p>
                <span>Data conclusão:</span> {new Date(dataConclusao).toLocaleDateString('pt-BR')}
            </p>
            <p>
                <span>Valor mensal:</span> R${valorMensal}
            </p>
            <div className={styles.despesa_card_actions}>
                <Link to={`/metas/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div> 
        </div>
    )
}

export default MetaCards