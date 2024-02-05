<script setup>
import { useCollection,useFirestore } from 'vuefire'
import {  collection,addDoc, updateDoc } from 'firebase/firestore'
import { doc, deleteDoc } from "firebase/firestore";
import { ref as refStorage } from 'firebase/storage';
import { ref } from 'vue';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import {  query, where } from "firebase/firestore";

let usuario = getAuth().currentUser


let db = useFirestore();
const coleccion = (collection(db, 'todos'));
const list = query(coleccion, where("usuarioEmail", "==", usuario.uid));

const todos = useCollection(list);
console.log(todos)
function eliminarNota(id) {
  deleteDoc(doc(db, 'todos', id));
}


function cambiarPrioridad(e,id) {
    const notaActualizar=doc(db,"todos",id);
    updateDoc(notaActualizar,{
        prioridad:e.target.value
    })
}

function tareaTerminada(e,id) {
    const notaActualizar=doc(db,"todos",id);
    updateDoc(notaActualizar,{
        terminado:e.target.checked
    })
}



</script>

<template>
    
    <br>
    <p>CUERPO</p>

    <br><ul>
        <li v-for="objeto in todos">
            <input type="checkbox" v-model="objeto.terminado" @change="tareaTerminada($event,objeto.id)">
            <label :class="{'terminado':objeto.terminado}">&nbsp {{objeto.texto}}</label>
            <select v-model="objeto.prioridad" @change="cambiarPrioridad($event,objeto.id)">
                <option value="alta">Alta</option>
                <option value="normal">Normal</option>
                <option value="baja">Baja</option>
            </select>
            <button @click="eliminarNota(objeto.id)">Eliminar</button>
            <a :href="objeto.url" target="_blank">Enlace foto</a>
        </li>
    </ul>
    
</template>

<style>
.terminado{
    text-decoration: line-through;
}
</style>