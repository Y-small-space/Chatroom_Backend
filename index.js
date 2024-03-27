const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 4000;
const userRegisterRouter = require('./router/Register');
const userLoginRouter = require('./router/Login');
const userRoomID = require('./router/RoomId');
const userSearchRouter = require('./router/SearchUser');
const userAddFriends = require('./router/AddFriends');
const createRoom = require('./router/CreateRoom');
const server = require('http').Server(app);
const Message = require('./models/Message');
const User = require('./models/User');
const userAllChatHistory = require('./router/ChatHistory')
const userSetProfile = require('./router/SetProfile');
const updateAvatar = require('./router/UpdateAvatar');
const deleteUser = require('./router/DeleteFriends/index');
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3004','http://localhost:3005'],
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ['Authorization'],
}));
const socketIo = require('socket.io');
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    },
    path: '/socket.io'
});

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error!!!'));
db.once('open', () => {
    console.log('Mongodb连接成功！')
})

app.use(express.json());
app.use('/api', userRegisterRouter);
app.use('/api', userLoginRouter);
app.use('/api', userSearchRouter);
app.use('/api', userAddFriends);
app.use('/api', userAllChatHistory)
app.use('/api', createRoom);
app.use('/api', userSetProfile);
app.use('/api', updateAvatar);
app.use('/api', userRoomID);
app.use('/api', deleteUser);
const uploadsPath = path.join(__dirname, 'router', 'UpdateAvatar', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

io.on('connection', (socket) => {
    console.log('A User connected');

    socket.on('join', (roomId) => {
        socket.join(String(roomId));
        console.log('A user join', String(roomId));
    })

    socket.on('message', async (message) => {
        console.log('Received message:', message);
        const { sender, receiver, roomId, content } = message;

        try {
            const senderUser = await User.findOne({ _id: sender })
            const receiverUser = await User.findOne({ phoneNumber: receiver })
            if (!senderUser || !receiverUser) {
                console.error('查询用户时出错：', sender, receiver);
            } else {
                const senderObjectId = senderUser._id
                const receiverUserID = receiverUser._id
                const newMessage = new Message({
                    sender: senderObjectId,
                    sender_username: senderUser.phoneNumber,
                    receiver: receiverUserID,
                    receiver_username: receiverUser.phoneNumber,
                    content: content,
                    timestamp: new Date(),
                    roomId: roomId,
                    avatar_sender: senderUser.avatar,
                    avatar_receiver: receiverUser.avatar
                });
                newMessage.save()
                    .then(savedMessage => {
                        console.log('消息已保存：', savedMessage);
                        io.to(roomId).emit('message', savedMessage);
                    })
                    .catch(error => {
                        console.error('检索信息时出错：', error);
                    })
            }
        } catch (error) {
            console.error('查询信息时出错：', error)
        }
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

server.listen(PORT, () => {
    console.log('====================================');
    console.log(`Sever listening on ${PORT}`);
    console.log('====================================');
})
