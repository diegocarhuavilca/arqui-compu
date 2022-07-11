import { defineStore } from "pinia";

const useStore = defineStore('store',{
  state:() =>{
    return{
      logged:false,
      nombre:'',
      apellido:''
    }
  },
  actions:{
    login(){
      this.logged = true
    },
    logout(){
      this.logged = false
    },
    saveUser(nombre :string,apellido:string){
      this.nombre = nombre,
      this.apellido = apellido
    }
  }
})

export default useStore 