import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import * as signalR from '@microsoft/signalr'
import { baseURL, useSignalR } from "../env";
import { AppState } from "../AppState";




export class SignalHandler {
/**
 * @param {String} hubUrl url for signalR hub
 */
  constructor(hubUrl = baseURL, requiresAuth = false){
    if(!useSignalR) { return }
    this.signal = new signalR.HubConnectionBuilder().withUrl(hubUrl +"/signalHub").build();
    this.start()
    this.requiresAuth = requiresAuth
    this.queue = []
    this.authenticated = false
    this
      .on("connected", this.onConnected)
      .on("authenticated", this.onAuthenticated)
      .on("error", this.onError)
  }

  on(event, fn) {
    this.signal?.on(event, fn.bind(this))
    return this
  }

  async start(){
   await this.signal.start()
    this.connected = true
    this.playback()
  }

  onConnected(connection) {
    logger.log('[SIGNAL_CONNECTION]', connection)
    this.connected = true
    this.playback()
  }

  onAuthenticated(auth) {
    logger.log('[SIGNAL_AUTHENTICATED]', auth)
    this.authenticated = true
    this.send('JoinGroup', AppState.user.id)
    this.playback()
  }

  onError(e){
    Pop.toast(e.message, 'error')
    logger.error(e)
  }

  enqueue(action, payload) {
    logger.log('[ENQUEING_ACTION]', { action, payload })
    this.queue.push({ action, payload })
  }

  playback() {
    logger.log('[SIGNAL_PLAYBACK]')
    const playback = [...this.queue]
    this.queue = []
    playback.forEach(e => {
      this.send(e.action, e.payload)
    })
  }

  async send(action, payload = undefined) {
    if (this.requiresAuth && !this.authenticated) {
      return this.enqueue(action, payload)
    }
    if (!this.connected) {
      return this.enqueue(action, payload)
    }
    try {
      logger.log('[SIGNAL SEND]', action, payload)
      await this.signal.send(action, payload)
    } catch (error) {
      logger.log(error)
      Pop.toast(error.message, 'error')
    }
  }
}
