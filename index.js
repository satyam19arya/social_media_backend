const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./routes/Auth');
const postsRouter = require('./routes/Posts');
const userRouter = require('./routes/User');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

dotenv.config('./.env');
const app = express();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({ limit: "20mb" }));
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
    res.send('Hello from server 😊');
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});