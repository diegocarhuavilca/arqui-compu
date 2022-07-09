<template>
<div class="mt-4">
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="usuario in usuarios.data.body" :key="usuario.id">
      <th >{{usuario.id}}</th>
      <td>{{usuario.nombre}}</td>
       <td>{{usuario.apellido}}</td>
       <td>
        <button class="btn btn-info">edit</button>
       </td>
    </tr>
  
  </tbody>
</table>
</div>
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

.table{
   max-width: 500px;
  margin: auto;
}

</style>
