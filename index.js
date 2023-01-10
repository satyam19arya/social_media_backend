const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');
const chatRouter = require('./routers/chatRouter');
const messagesRouter = require('./routers/messageRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config('./.env');
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

const PORT = process.env.PORT;
dbConnect();

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messagesRouter);

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
}); 