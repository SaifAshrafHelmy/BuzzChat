module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request")
    next(new Error("Not authorized"))
    // when we throw a connect_error we setUser to false in useSocketSetup in the frontend
  } else {
    next()
  }
}