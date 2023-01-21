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
const cloudinary = require('cloudinary').v2;
dotenv.config('./.env');
const app = express();

// cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//middlewares
app.use(express.json({ limit: "5mb" }));
app.use(morgan('common'));
app.use(cookieParser());
let origin = 'http://localhost:3000';
console.log('Here env', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
    origin = process.env.CORS_ORIGIN;
}
app.use(cors({
    credentials: true,
    origin
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