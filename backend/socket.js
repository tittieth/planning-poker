let users = []

function socket(io) {
  io.on('connection', function (socket) {
    console.log('user connected: ' + socket.id);

    socket.on('disconnect', function () {
      console.log('user disconnected: ' + socket.id)
      const userDisconnecting = users.find(user => user.id === socket.id)
      if (userDisconnecting) {
        const userIndex = users.findIndex(user => user.id === socket.id)
        users.splice(userIndex, 1)
        console.log(users)
      }
    });

    socket.on('newTask', (newTaskDescription) => {
      console.log(`New task: ${newTaskDescription}`);
      socket.emit('updateList');
    });

    socket.on('user-join', (user) => {
      user.id = socket.id;
      users.push(user);
      console.log(users);
      io.emit('user-join', users)
    });

    socket.on('nextTask', (nextTask) => {
      socket.emit('displayNextTask', nextTask);
      console.log(nextTask);
    })

  });
}

module.exports = socket;