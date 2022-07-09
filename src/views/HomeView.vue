<template>
<h1 class="mb-4">Usuarios</h1>

<div class="d-flex justify-content-center mx-2">
  <router-link class="btn btn-primary"  :to="{
    name:'userList'
  }">Lista Usuarios</router-link>
  <router-link class="btn btn-secondary mx-2" :to="{
    name:'userCreate'
  }">Crear Usuario</router-link>
  <router-link class="btn btn-success mx-2" :to="{
    name:'userCreate'
  }">Login</router-link>
  <router-link class="btn btn-info mx-2" :to="{
    name:'userCreate'
  }">Chat</router-link>
</div>
<router-view/>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import { userService } from '@/services/users';

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  setup(){
    const usuarios = ref()
    userService.get().then((res)=>{
      usuarios.value =res
    })
    return{
      usuarios
    }
  }
});
</script>

<style>
td,th
{
  vertical-align:middle;
}

h1{
  max-width: 500px;
  margin: auto;
}



</style>
