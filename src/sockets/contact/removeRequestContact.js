import { pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray } from './../../helpers/socket.helper'

/**
 * 
 * @param io from socket.io library 
 */
 const removeRequestContact = (io) => {
  let clients = {}
  io.on("connection", (socket) => {
    //push socket id array
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id)

    socket.on("remove-request-contact", (data) => {
      const currentUser = {
        id: socket.request.user._id
      }
      if (clients[data.contactId]) {
        emitNotifyToArray(clients, data.contactId, io, "response-remove-request-contact", currentUser)
      }
    })

    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket)
    })

  })
}

module.exports = removeRequestContact
