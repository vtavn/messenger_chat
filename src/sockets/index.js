import addnewContact from './contact/addNewContact'

/**
 * 
 * @param io from socket.io library
 */
const initSockets = (io) => {
  addnewContact(io)

}

module.exports = initSockets
