<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="container-fluid">
    <input class="btn btn-primary" type="file" @change="uploadImage">
    <canvas id="canvas" style=""></canvas>
      <div class="row">
        <div class="col-6">
          <span>original</span>
          <img :src="original" class="" alt="" @load="blurImage">
        </div>
        <div class="col-6">
          <span v-if="loading">loading...</span>
          <span>blurred</span>
          <img :src="blurred" class="img-fluid" alt="">
        </div>
      </div>
    </div>
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
import {blurService} from '../services/BlurService'
import { logger } from "../utils/Logger"
export default {
  name: 'Home',
  setup(){
    const original = ref('')
    const imageRaw = ref({})
    const blurred = ref('')
    const message = ref('')
    const loading = ref(false)
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

}
</style>
