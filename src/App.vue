<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { getAuth } from "firebase/auth";
import { getCurrentUser } from 'vuefire';


</script>

<template>
  <header>
    <div class="wrapper">
      <div>
        <nav>
          <RouterLink to="/">Inicio</RouterLink>
          &nbsp|&nbsp
          <RouterLink to="/privada">Area Privada</RouterLink>
          &nbsp|&nbsp
          <RouterLink to="/admin">Area de Administrador</RouterLink>
        </nav>
        <RouterView />
      </div>
    </div>
  </header>
  
</template>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  body{
    display: flex;
    flex-direction: column;
    background-color: rgb(34, 34, 34);
    color: white;
    width: 100%;
    height: 100%;
  }
  .habilitador{
    padding: 20px;
  }
  .eliminarTodo{
    text-decoration: underline;
    background-color: rgb(34, 34, 34);
    border: none;
    color: yellow;
  }
  .eliminarTodo:hover{
    cursor: pointer;
  }
  select{
    background-color: rgb(20, 20, 20);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 5px;
  }

  .añadir{
    padding: 20px;
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  .añadir__nota{
    border: none;
    padding: 5px;
    border-radius: 5px;
    width: 70%;
  }
  div>p{
    padding: 20px;
  }
  .buscar{
    
    padding: 20px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buscar__nota{
    padding: 5px;
    border: none;
    border-radius: 5px;
    width: 90%;
  }
  .eliminar{
    border-radius: 10px;
    padding: 10px;
    background-color: rgb(7, 7, 7);
    border: none;
    color: white;
  }
  .eliminar:hover{
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0px 1px 14px 0px #FFF;
  }
  ul{
    
    width: 80%;
    display: flex;
    flex-direction: column;
  }
  li{
    background-color: rgb(48, 48, 48);
    padding: 10px;
    margin-left: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10%;
    font-size: xx-large;
  }
  li:first-child{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  li:last-child{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .tachado{
    text-decoration: line-through;
    color: rgb(16, 141, 109);
  }
  li>p{
    width: 60%;
  }
</style>
