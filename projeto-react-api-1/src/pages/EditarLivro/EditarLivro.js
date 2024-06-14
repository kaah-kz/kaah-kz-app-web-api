import styles from './EditarLivro.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';

function EditarLivro(params) {

    // STATE DE DADOS DE CATEGORIAS VINDAS DO ARQUIVO db.json
    const [categories, setCategories] = useState([]);

    // RECUPERANDO O ID DA URL
    const {id} = useParams();
    console.log('ID:' + id);

    // OBJETO DE NAVEGAÇÃO
    const navigate = useNavigate();

    const[book, setBook] = useState({});

    // useEffect(()=>{
    //     fetch
    //         ('http://localhost:5000/categories',
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         }).then((resp) =>resp.json()
    //         ).then(
    //           (data)=>{
    //             setCategories(data)
    //             console.log(data)
    //           }
    //         )
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   },[])

    // RECUPERANDO OS DADOS DO LIVRO PARA A EDIÇÃO
    useEffect(()=>{
        fetch(`http://localhost:5000/listagemLivro/${id}`, {
          method: 'GET',
          mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*'
            },
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            setBook(data.data);
            console.log(data.data);
        })
        .catch((err)=>{console.log(err)});
  
    },[]);

    // HANDLER DE CAPTURA DOS DADOS DE INPUT (NOME, LIVRO, AUTOR, DESCRIÇÃO)
    function handlerChangeBook(event) {
        setBook({...book, [event.target.name] : event.target.value});
        console.log(book);
      }
  
    // HANDLER DE CAPTURA DOS DADOS DE SELECT (ID E CATEGORIA)
      function handlerChangeCategory(event) {
        setBook({...book, category:{
          id: event.target.value,
          category: event.target.options[event.target.selectedIndex].text
        }});
      }
      // console.log(book);
      
    //FUNCIONALIDADE DE EDIÇÃO DE LIVRO
    function editBook(book) {
      fetch(`http://localhost:5000/alterarLivro`, {
          method: 'PUT',
          mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*'
            },
          body: JSON.stringify(book)
      })
      .then(resp=>resp.json())
      .then((data)=>{
        setBook(data);
        navigate('/Livros', {state: 'LIVRO ALTERADO COM SUCESSO!'})
      })
      .catch(err=>(console.log(err)));
    }

    // FUNÇÃO DE SUBMIT CONTROLADO DOS DADOS
    function submit(event){
      event.preventDefault();
      editBook(book);
    }

    return(
    <div className={styles.book_container}>
        <h1>EDIÇÃO DE LIVROS!</h1>
        <form onSubmit={submit}>
            <Input
                type="text"
                name="nome_livro"
                id="nome_livro"
                placeholder="Digite o titulo do livro"
                text="Digite o título do livro:"
                value={book.nome_livro}
                handlerOnChange={handlerChangeBook}
            />

            <Input
                type="text"
                name="autor_livro"
                id="autor_livro"
                placeholder="Digite o nome do autor"
                text="Digite o nome do autor:"
                value={book.autor_livro}
                handlerOnChange={handlerChangeBook}
            />

            <Input
                type="text"
                name="descricao_livro"
                id="descricao_livro"
                placeholder="Digite a descricao do livro"
                text="Digite a descrição do livro:"
                value={book.descricao_livro}
                handlerOnChange={handlerChangeBook}
            />

            <Select
                name="categoria-id"
                text="Selecione a categoria do livro:"
                options={categories}
                handlerOnChange={handlerChangeCategory}
            />

            <p><Input type='submit' value='Editar Livro'/></p>

        </form>
    </div>
  );
}

export default EditarLivro;