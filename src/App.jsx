import { useState } from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import './app.css'


function App() {

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');

const [posts, setPosts] = useState([]);

const [idpost, setIdPost] = useState('');

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
  // essa função casdastra autor com id automatico
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
// Essa função busca os posts por id
 /* const docFef = doc(db, "posts", "12345");

   await getDoc(docFef)
   
   .then((snapshot) =>{
     setAutor(snapshot.data().autor)
     setTitulo(snapshot.data().titulo)
   })
   .catch((error) =>{
     console.log("deu erro" + error)
   })*/
  // essa função busca todos os posts por id
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
    
  async function atualizarPost(){

    const docRef = doc(db, "posts", idpost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("Post atualizado")
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(() =>{
      console.log("Erro ao atualizar post")
    })

  }

 async function excluirPost(id){
   const docRef = doc(db, "posts", id)
   await deleteDoc(docRef)
   .then(() =>{
    alert("Post excluido com sucesso")
   })

  }

  return (
    <div>
      <h1>App fire</h1>

      <div className="container">

        <label>ID do post</label>
        <input
        placeholder='Digite o id do post'
        value={idpost}
        onChange={(e) => setIdPost(e.target.value)}
        /> <br/>

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

        <button onClick={atualizarPost}>Atualizar Post</button>

        <ul>
          {posts.map( (post) =>{
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br/>
                <span>Titulo: {post.titulo} </span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={()=> excluirPost (post.id) }>Excluir</button> <br/> <br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
}

export default App
