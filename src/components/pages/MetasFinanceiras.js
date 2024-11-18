import { useState, useEffect } from "react";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import styles from './MetasFinanceiras.module.css';
import Container from '../layout/Container';
import MetaCards from "../Project/MetaCards";

function MetasCriadas() {
    const [metas, setMetas] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [metaMessage, setMetaMessage] = useState('');
    const [newMeta, setNewMeta] = useState({
        nomeMeta: '',
        valorMeta: '',
        dataConclusao: '',
        valorMensal: ''
    });

    useEffect(() => {
        fetchMetas();
    }, []);

    const fetchMetas = () => {
        setTimeout(() => {
            fetch('http://localhost:5000/metas', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setMetas(data);
                setRemoveLoading(true);
            })
            .catch((err) => console.error("Erro ao buscar metas:", err));
        }, 500);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedMeta = { ...newMeta, [name]: value };

        // Calcular o valor mensal automaticamente
        if (name === 'valorMeta' || name === 'dataConclusao') {
            const { valorMeta, dataConclusao } = { ...updatedMeta, [name]: value };
            if (valorMeta && dataConclusao) {
                const monthsLeft = calculateMonthsLeft(dataConclusao);
                updatedMeta.valorMensal = monthsLeft > 0 ? (valorMeta / monthsLeft).toFixed(2) : 0;
            }
        }

        setNewMeta(updatedMeta);
    };

    const calculateMonthsLeft = (dataConclusao) => {
        const today = new Date();
        const conclusionDate = new Date(dataConclusao);
        const yearsDiff = conclusionDate.getFullYear() - today.getFullYear();
        const monthsDiff = conclusionDate.getMonth() - today.getMonth();
        return yearsDiff * 12 + monthsDiff + 1; // +1 para incluir o mês atual
    };

    const addMeta = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/metas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMeta),
        })
        .then((resp) => resp.json())
        .then(() => {
            fetchMetas();
            setMetaMessage('Meta adicionada com sucesso!');
            setNewMeta({ nomeMeta: '', valorMeta: '', dataConclusao: '', valorMensal: '' });
        })
        .catch((err) => console.error("Erro ao adicionar meta:", err));
    };

    const removeMeta = (id) => {
        fetch(`http://localhost:5000/metas/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
            setMetas(metas.filter((meta) => meta.id !== id));
            setMetaMessage('Meta removida com sucesso!');
        })
        .catch((err) => console.error("Erro ao remover meta:", err));
    };

    return (
        <div className={styles.metas_container}>
            <h2>Minhas Metas Financeiras</h2>
            
            {metaMessage && <Message type="success" msg={metaMessage} />}
            
            <form onSubmit={addMeta} className={styles.meta_form}>
                <div className={styles.form_group}>
                    <label>Nome da Meta:</label>
                    <input 
                        type="text" 
                        name="nomeMeta" 
                        value={newMeta.nomeMeta} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Valor Total:</label>
                    <input 
                        type="number" 
                        name="valorMeta" 
                        value={newMeta.valorMeta} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Data de Conclusão:</label>
                    <input 
                        type="date" 
                        name="dataConclusao" 
                        value={newMeta.dataConclusao} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Valor Mensal (calculado automaticamente):</label>
                    <input 
                        type="text" 
                        name="valorMensal" 
                        value={newMeta.valorMensal} 
                        readOnly 
                    />
                </div>
                <button type="submit">Adicionar Meta</button>
            </form>

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
                {removeLoading && metas.length === 0 && <p>Não há metas cadastradas!</p>}
            </Container>
        </div>
    );
}

export default MetasCriadas;
