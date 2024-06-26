import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../components/Message/Message';
// import Container from '../../components/Container/Container';
import CardBook from '../../components/CardBook/CardBook';

import styles from './Livro.module.css'

function Livros() {

  const [books, setBooks] = useState([]);

  //ESTADO DE DADOS DA MENSAGEM DE EXCLUSÃO DE LIVRO
  const[bookMessage, setBookMessage] = useState('');

  useEffect(()=>{
      fetch('http://localhost:5000/listagemLivros', {
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
        // console.log(data)
        setBooks(data.data)
        console.log('TESTE - ' + books)
      })
      .catch((err)=>{console.log(err)});
  },[]);

  //FUNÇÃO DE EXCLUSÃO DE LIVRO
  function removeBooks(id) {
    fetch(`http://localhost:5000/excluirLivro/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(resp=> resp.json())
    .then(
      (data)=>{
        setBooks(books.filter((book_data)=>book_data.cod_livro !== id))
        // alert('LIVRO EXCLUÍDO')
        setBookMessage('LIVRO EXCLUÍDO COM SUCESSO!');
      }
    )
    .catch(err=>console(err));
  }

  const location = useLocation();
  let message = '';

  console.log('LOCATION STATE: ' + location.state);

  if (location.state){
    message = location.state;
  }
  return (
    <section className={styles.livros_container}>
      <h1>Aqui serão listados seus<span>livros</span></h1>

      {/* MENSAGEM DE SUCESSO PARA CADASTRO */}
      {
        message &&
            <Message
                msg={message}
                type='sucess'
            />
      }

      {/* MENSAGEM DE SUCESSO PARA EXCLUSÃO */}
      {
        bookMessage &&
            <Message
                msg={bookMessage}
                type='sucess'
            />
      }

      {/* <Container> */}
        {/* <CardBook
          id='1'
          livro='TESTE DE LIVRO-1'
          autor='TESTE DE AUTOR-1'
          categoria='TESTE DE CATEGORIA-1'>
        </CardBook>

        <CardBook
          id='2'
          livro='TESTE DE LIVRO-2'
          autor='TESTE DE AUTOR-2'
          categoria='TESTE DE CATEGORIA-2'>
        </CardBook>

        <CardBook
          id='2'
          livro='TESTE DE LIVRO-3'
          autor='TESTE DE AUTOR-3'
          categoria='TESTE DE CATEGORIA-3'>
        </CardBook> */}
      {/* </Container> */}
      
      
      {
        books.map((book)=>(
          <CardBook
              id={book.cod_livro}
              livro={book.nome_livro}
              autor={book.autor_livro}
              // categoria={book.category.category}
              key={book.cod_livro}
              handlerRemove={removeBooks}>
          </CardBook>
        ))
      }

    </section>
  )
}

export default Livros;