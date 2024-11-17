import { useState, useEffect } from "react";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import styles from './MetasFinanceiras.module.css';
import Container from '../layout/Container';
import LinkButton from "../layout/LinkButton";
import MetaCards from "../Project/DespesaCards";

function MetasCriadas() {
    const [metas, setMetas] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [metaMessage, setMetaMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/metas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setMetas(data);
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err));
        }, 500);
    }, []);

    function removeMeta(id) {
        fetch(`http://localhost:5000/metas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(() => {
            setMetas(metas.filter((meta) => meta.id !== id));
            setMetaMessage('Meta removida com sucesso!');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.metasCriadas_container}>
            <div className={styles.tittle_container}>
                <h2>Minhas Metas Financeiras</h2>
                <LinkButton to="/metas" text="Adicionar Meta Financeira"></LinkButton>
            </div>

            {metaMessage && <Message type="success" msg={metaMessage} />}
            <Container customClass="start">
                {metas.length > 0 &&
                    metas.map((meta) => (
                        <MetaCards 
                            id={meta.id}
                            nomeMeta={meta.nomeMeta}
                            valorMeta={meta.valorMeta}
                            dataConclusao={meta.dataConclusao}
                            valorMensal={meta.valorMensal}
                            key={meta.id}
                            handleRemove={removeMeta}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && metas.length === 0 && (
                    <p>Não há metas cadastradas!</p>
                )}
            </Container>
        </div>
    );
}

export default MetasCriadas;
