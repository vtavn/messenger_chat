/**
 * 
 * @param io from socket.io library 
 */
const addNewContact = (io) => {
  io.on("connection", (socket) => {
    socket.on("add-new-contact", (data) => {
      console.log(data)
      console.log(socket.request.user);
    })
  })
}

module.exports = addNewContact

