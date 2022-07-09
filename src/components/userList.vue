<template>
  <div class="mt-4">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="usuarios">
        <tr v-for="usuario in usuarios.data.body" :key="usuario.id">
          <th>{{ usuario.id }}</th>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellido }}</td>
          <td>
            <button class="btn btn-info" @click="$router.push({name:'userEdit',params:usuario})">edit</button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="id = usuario.id"
            >
              del
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Borrar Usuario
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    Desea borrar el usuario :
                    {{ usuario.nombre }} - {{ usuario.apellido }}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      class="btn btn-danger"
                      @click="eliminarUsuario()"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { userService } from "@/services/users";

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const usuarios = ref();
    const id = ref();
    userService.get().then((res) => {
      usuarios.value = res;
    });

    const eliminarUsuario = () => {
      userService.delete(id.value).then(() => {
        alert("usuario eliminado");
        userService.get().then((res) => {
          usuarios.value = res;
        });
      });
    };
    return {
      usuarios,
      eliminarUsuario,
      id,
    };
  },
});
</script>

<style>
td,
th {
  vertical-align: middle;
}

.table {
  max-width: 500px;
  margin: auto;
}
</style>
