import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

import { createRouter, createWebHistory } from 'vue-router'
import privada from './components/privada.vue'
import cabecera from './components/cabecera.vue'
import cuerpo from './components/cuerpo.vue'
import inicio from './components/inicio.vue'
import admin from './components/admin.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'


// ROUTER
const routes =[
  {path:'/privada',component:privada},
  {path:'/hola',component:cabecera},
  {path:'/',component:inicio},
  {path:'/admin',component:admin}
]
const router = createRouter ({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
let email= false
let estasIdentificado=false
router.beforeEach( (to, from)=>{
  console.log("TO: "+to)
  
  if ((to.path=="/privada" && !estasIdentificado) || (to.path=="/admin" && !email)) {
    return false;
  }else{
    return true;
  }
})

const auth = getAuth()
onAuthStateChanged(auth, (user)=>{
  if (user) {
    console.log("Se ha iniciado Sesion")
    const uid = user.id
    console.log(user.email)
    if (user.email=="admin@gmail.com") {
      email=true
    }else{
      email=false
    }
    estasIdentificado=true
  }else{
    console.log("Se ha cerrada Sesion")
    estasIdentificado=false
  }
})

const app = createApp(App)
app.use(router);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
app.mount('#app')