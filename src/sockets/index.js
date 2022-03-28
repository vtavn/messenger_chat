import addnewContact from './contact/addNewContact'
import removeRequestContact from './contact/removeRequestContact'

/**
 * 
 * @param io from socket.io library
 */
const initSockets = (io) => {
  addnewContact(io)
  removeRequestContact(io)
}

module.exports = initSockets
