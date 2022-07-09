<template>
  <div class="user-create mt-4">
    <h5>Crear Usuario</h5>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Id</label>
      <input
        type="text"
        class="form-control"
        v-model="user.id"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Nombre</label>
      <input
        type="text"
        class="form-control"
        aria-describedby="emailHelp"
        v-model="user.name"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Apellido</label>
      <input
        type="text"
        class="form-control"
        v-model="user.lastName"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="user.password"/>
    </div>
    <button @click="crearUsuario()" class="btn btn-primary">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { userService } from "@/services/users";

export default defineComponent({
  name: "UserCreate",
  components: {},
  setup() {
    const user = reactive({
      id: "",
      name: "",
      lastName: "",
      password: "",
    });
    const crearUsuario = () => {
      userService.create(user);
    };

    return { user, crearUsuario };
  },
});
</script>

<style>
.user-create {
  max-width: 500px;
  margin: auto;
}
</style>
