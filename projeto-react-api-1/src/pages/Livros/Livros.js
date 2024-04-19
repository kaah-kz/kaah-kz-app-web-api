import { useLocation } from 'react-router-dom';
import Message from '../../components/Message/Message';
import styles from './Livro.module.css'

function Livros() {

  const location = useLocation();
  let message = '';

  console.log('location state: ' + location.state);

  if (location.state){
    message = location.state;
  }
  return (
    <section className={styles.livros_container}>
      <h1>Aqui vai ser listado seus <span>livros</span></h1>

      {
        message && (
          <Message
            msg={message}
            type='sucess'
          />
        )
      }
    </section>
  )
}

export default Livros;