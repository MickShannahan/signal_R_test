import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import * as signalR from '@microsoft/signalr'
import { SignalHandler } from "../utils/SignalHandler";



class SignalRService extends SignalHandler{
  constructor(){
    super()
    this
      .on('JoinedGroup', this.joinedGroup)
      .on('ReceivedMessage', this.receivedMessage)
  }

  // OUTS
  async joinGroup(groupName = 'general'){
    await this.send('JoinGroup',  groupName)
  }

  // INS

  joinedGroup(message){
    logger.log(message)
  }

  receivedMessage(message){
    logger.log('[SIGNAL Received Message]', message)
    AppState.messages.push(message)
  }

}

export const signalRService = new SignalRService()


