<template>
  <div class="user-create mt-4">
    <h5>Chat</h5>

    <div class="row">
      <div class="col-3">
        <ul class="list-group">
          <li class="list-group-item" v-for="member in members" :key="member">{{member}}</li>
        </ul>
      </div>
      <div class="col-8">

        <div v-html="messages"></div>
        <div class="row">
           <div class="form-group col-10">
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Envia mensaje" v-model="message">
  </div>
  <div class="btn btn-primary col-2" @click="sendMessage()"> > </div>
        </div>
      </div>
    </div>

    <button class="btn btn-danger" @click="logout()">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { userService, userLogin } from "@/services/users";
import router from "@/router";
import Store from "@/store";

export default defineComponent({
  name: "UserCreate",
  components: {},
  setup() {
    const store = Store();

    if(!store.$state.logged){
      router.push({name:'userList'})
    }

    const socket = new WebSocket(
      "wss://6b7r0rsw1g.execute-api.us-east-1.amazonaws.com/production"
    );
    const members = ref()
    const message = ref()
    const messages = ref('')


  if(socket.readyState !== WebSocket.OPEN && store.$state.logged){
     socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          action: "setName",
          name: `${store.$state.nombre}`,
        })
      );
    });
  }
   

    socket.addEventListener("message", (event) => {
        console.log(JSON.parse(event.data))

      const data = JSON.parse(event.data)
      if(event.data){

        if(data.members){
        members.value = JSON.parse(event.data).members

        }

        if(data.systemMessage){
          messages.value += `<p class="text-muted">${data.systemMessage}</p>`
        }

        if(data.publicMessage ){
           messages.value += `<p class="">${data.publicMessage}</p>`
        }


      }
    });

    const logout = () => {
      socket.close();
      store.logout();
      router.push({ name: "userList" });
    };

    const sendMessage = () =>{
      socket.send(
        JSON.stringify({
          action: "sendPublic",
          message: message.value,
        })
      );
      message.value=''
      messages.value += ''
    }

    return { store, logout,members,message,messages,sendMessage};
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
