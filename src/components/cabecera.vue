<script setup>
    import {ref} from 'vue';
    import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
    import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { useFirestore, useCollection } from 'vuefire'
    

    let nota=ref("");
    let prioridad=ref("normal")
    let nombre=ref(null)
    let uid;
    let db= useFirestore();
    const todos = useCollection(collection(db, 'todos'))

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            uid = user.uid;
            console.log("sesion iniciada "+ uid)
        
            // ...
        } else {
            console.log("sesion cerrada")
            estasIdentidicado=false;
            // User is signed out
            // ...
        }
    });

    // Funciones
    function subirArchivo(e) {
        nombre.value=e.target.files[0]
        console.log(nombre)
    }
    
    function alta() {
        console.log(nombre,"sissdasffaseff")
        
        if(nombre!=null){
            const storage = getStorage();
            const storageRef = refStorage(storage, 'ProyectoDEWCPrueba');

            uploadBytes(storageRef, nombre.value).then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(downloadURL=>{
                console.log("DownLoad"+ downloadURL)

                const docRef= addDoc(collection(db,"todos"),{
                    usuarioEmail:uid,
                    texto:nota.value,
                    fecha:new Date(),
                    prioridad:prioridad.value,
                    terminado:false,
                    url:downloadURL
                });
                console.log("")
                nota.value="";
                nombre.value=null;
            }).catch((error) => {
                console.error("Error al subir el archivo:", error);
            });
        }
        
    }
</script>
<template>
    <br>
    Cabecera <br><br>
    <input type="text" v-model="nota" v-on:keyup.enter="alta">
    <select v-model="prioridad" >
        <option value="normal" selected>Normal</option>
        <option value="alta" >Alta</option>
        <option value="baja">Baja</option>
    </select>
    <input type="file" required @change="subirArchivo($event)">
    <button @click="alta">Alta de Nota</button>
    <br>
</template>
<script>
</script>