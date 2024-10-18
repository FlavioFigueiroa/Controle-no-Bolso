import styles from './DespesasForm.module.css'
import Input from '../form/input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import {useEffect, useState} from 'react'

function DespesasForm({ handleSubmit, btnText, despesaData }){
    const [categories, setCategories] = useState([])
    const [despesa, setDespesa] = useState(despesaData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(despesa)
        handleSubmit(despesa)
    }

    function handleChange(e){
        setDespesa({ ...despesa, [e.target.name]: e.target.value })
        //console.log(despesa)
    }

    function handleCategory(e){
        setDespesa({ ...despesa, 
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            text="Descrição" 
            name="descricao" 
            placeholder="Insira a descrição"
            handleOnChange={handleChange} 
            value={despesa.descricao ? despesa.descricao: ''}/>
            <Input 
            type="date" 
            text="Data" 
            name="data" 
            placeholder=""
            handleOnChange={handleChange} 
            value={despesa.data ? despesa.data: ''}/>
            <Input 
            type="number" 
            text="Valor" 
            name="valor" 
            placeholder="Valor"
            handleOnChange={handleChange} 
            value={despesa.valor ? despesa.valor: ''}/>
            <Select name="category_id" 
            text="Selecione o Status" 
            options={categories} 
            handleOnChange={handleCategory} 
            value={despesa.category ? despesa.category.id : ''}/>
            <SubmitButton text={btnText} />

        </form>
    )
}

export default DespesasForm