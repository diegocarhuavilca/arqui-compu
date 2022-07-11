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
    name:'Login'
  }">Login</router-link>
  <router-link class="btn btn-info mx-2" :class="store.logged?'':'disabled'" :to="{
    name:'Chat'
  }">Chat</router-link>
</div>
<router-view/>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import { userService } from '@/services/users';
import Store from '@/store'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  setup(){
    const store = Store().$state
    const usuarios = ref()
    userService.get().then((res)=>{
      usuarios.value =res
    })
    return{
      usuarios
      ,store
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
