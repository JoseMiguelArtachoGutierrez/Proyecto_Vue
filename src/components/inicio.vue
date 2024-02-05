<script setup>
    import { ref } from 'vue';
    import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    let usuario= ref(getAuth().currentUser);
    let estaIdentificado= ref(false);
    function iniciaSesison() {
        
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            usuario.value=user;
            estaIdentificado=true;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    function cerrarSesion() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Cerrando Sesion")
            usaurio.value="";
            estaIdentificado=false;
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
    function registroEmailYPassword(email,password) {
        console.log(email+" "+password)
        const auth= getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            console.log("hola",user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            // ..
        });
    }
    function identificarseWithEmailAndPassword(email,password){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            usuario.value=user;
            estaIdentificado=true
            console.log("hola no se que, " ,usuario.value)
            // ...
            email.value=""
            password.value=""
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    let mostrar= ref(true);
    function cambiarIdentificarseCrearCuenta(){
        mostrar.value=!mostrar.value;
    }

</script>

<template>
    <div v-if="estaIdentificado"><h1 >{{usuario.email}}</h1></div>
    
    <br>
    <h1>Inicio</h1>
    <button @click="cerrarSesion">Cerrar Sesion</button>
    <br><br>
    
    <br>
    <div v-if="mostrar">
        <button @click="cambiarIdentificarseCrearCuenta">Crear Cuenta</button>
        <div>
            <h2>Usuario Y Contraseña Inicio de sesion</h2>
            <form @submit.prevent="registroEmailYPassword(email,password)">
                <label>Email: </label>
                <input type="email" v-model="email" required><br>
                <label>Contraseña: </label>
                <input type="password" minlength="6" v-model="password" required>
                <input type="submit"  value="Iniciar Sesion">
            </form>
        </div>
    </div>
    <div v-else>
        <button @click="cambiarIdentificarseCrearCuenta">Inicar Sesion</button>
        <div>
            <h2>Usuario Y Contraseña Crear Cuenta</h2>
            <form @submit.prevent="identificarseWithEmailAndPassword(email,password)">
                <label>Email: </label>
                <input type="email" v-model="email" required><br>
                <label>Contraseña: </label>
                <input type="password" minlength="6" v-model="password" required>
                <input type="submit"  value="Registrarse">
            </form>
        </div>
    </div>
    <div>
        <h2>Google</h2>
        <button @click="iniciaSesison">Inicia sesion con Google</button>
    </div>
    
    
</template>