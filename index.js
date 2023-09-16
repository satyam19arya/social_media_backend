const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
dotenv.config('./.env');
const app = express();

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(morgan('common'));
app.use(cookieParser());
let origin = 'http://frontend.satyam-arya.click';
if(process.env.NODE_ENV === 'production') {
    origin = process.env.CORS_ORIGIN;
}
app.use(cors({
    credentials: true,
    origin
}));

const PORT = process.env.PORT;
dbConnect();

app.get('/', (req, res) => {
    res.send('Hello from PRANAV 😎');
});

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});