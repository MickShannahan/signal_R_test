<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <input type="text form-group" v-model="message">
    <button class="btn btn-primary" @click="sendMessage">send message</button>
    <ul>
      <li v-for="m in messages" :key="m">{{m}}</li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import {signalRService} from '../services/SignalRService'
export default {
  name: 'Home',
  setup(){
    const message = ref('')
    onMounted(()=>{
      signalRService.joinGroup('general')
    })
    return{
      message,
      messages: computed(()=> AppState.messages),
      sendMessage(){
        signalRService.send('SendMessage',message.value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
