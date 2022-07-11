<template>
  <div class="user-create mt-4">
    <h5>Login</h5>
    <div v-if="loading">
          <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Id</label>
      <input
        type="text"
        class="form-control"
        v-model="user.id"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        aria-describedby="emailHelp"
        v-model="user.password"
      />
    </div>
    <div v-if="error" class="text-danger">Error al logearse</div>
    
    <button class="btn btn-primary" @click="loginUser()">Login</button>
    </div>

    <div v-else>
<div class="lds-dual-ring"></div>
      
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { userService,userLogin } from "@/services/users";
import Store from '@/store'
import router from "@/router";

export default defineComponent({
  name: "UserCreate",
  components: {},
  setup() {
    const loading = ref(true)
    const store = Store()
    const user = reactive({
      id:'',
      password:'',
     } as userLogin) 

     const error = ref(false)


    const loginUser = () =>{
      loading.value = false
      userService.login(user).then((data)=>{
        loading.value= true
        if(data.data.body.data.Count==0){
          error.value = true
        }
        else{
          store.login()
          let dataUser = data.data.body.data.Items[0]
          store.saveUser(dataUser.nombre , dataUser.apellido)
          router.push({name:'Chat'})
        }

      })
    }

    return {user,loading,loginUser,error};
  },
});
</script>

<style>
.user-create {
  max-width: 500px;
  margin: auto;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(0, 0, 155);
  border-color: rgb(0, 0, 155) transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
