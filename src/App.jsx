import { useState } from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore'
import './app.css'


function App() {

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');

const [posts, setPosts] = useState([]);

async function handleAdd() {

 /* await setDoc(doc(db, "posts", "12345"), {
    titulo: titulo,
    autor: autor
  })
  .then(() => {
   console.log("Dados cadastrados com sucesso")
  })
  .catch((error) =>{
    console.log("Gerou erro" + error)
  })*/

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("Dados cadastrados com sucesso")
      setTitulo('');
      setAutor('');
     })
     .catch((error) =>{
       console.log("Gerou erro" + error)
     })
}

async function buscarPost() {

 /* const docFef = doc(db, "posts", "12345");

   await getDoc(docFef)
   
   .then((snapshot) =>{
     setAutor(snapshot.data().autor)
     setTitulo(snapshot.data().titulo)
   })
   .catch((error) =>{
     console.log("deu erro" + error)
   })*/

     const postsRef = collection(db, "posts");

     await getDocs(postsRef)
     .then((snapshot) => {
       let lista = [];

       snapshot.forEach((doc) =>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
       })

       setPosts(lista);

     })
     .catch((error) => {
      console.log("Deu erro" + error)
     })
  }
  return (
    <div>
      <h1>App fire</h1>

      <div className="container">
        <label>Titulo:</label>
        <textarea 
        type = "text"
        placeholder='Digite o titulo'
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <input type="text" placeholder="Digite o autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar posts</button>

        <ul>
          {posts.map( (post) =>{
            return(
              <li key={post.id}>
                <span>Titulo: {post.titulo} </span> <br/>
                <span>Autor: {post.autor}</span> <br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
}

export default App
