const { success, error } = require('../utils/responseWrapper');
const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const {mapPostOutput} = require('../utils/Utils');

const createPostController = async (req, res) => {
    try{
        const {caption , postImg} = req.body;
        if(!caption){
            return res.send(error(400, 'caption is required'));
        }

        if(!postImg){
            return res.send(error(400, 'Image is required'));
        }

        const cloudImg = await cloudinary.uploader.upload(postImg, {
            folder: 'postImg',
        });

        const owner = req._id;
        const user = await User.findById(req._id);
        const post = await Post.create({
            owner,
            caption,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.url
            }
        });

        user.posts.push(post._id);
        await user.save();
        return res.send(success(201, {post}));

    }catch(e){
        res.send(error(500, e.message));
    }
};

const likeAndUnlikePost = async (req, res) => {
    try{
        const {postId} = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId).populate('owner');
        if(!post){
            return res.send(error(404,'Post not found'));
        }

        if(post.likes.includes(curUserId)){
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);
        }else{
            post.likes.push(curUserId);
        }
        await post.save();
        return res.send(success(200, {post: mapPostOutput(post, req._id)}));

    }catch(e){
        return res.send(error(500, e.message));
    }
};

const getAllPosts = async (req, res) => {
    try{
        let posts;
        const { page, limit = 2 } = req.body;
        if(!page){
            posts = await Post.find().populate('owner');
        }
        else{
            const offset = (page - 1) * limit;
            const posts = await Post.find().populate('owner').skip(offset).limit(limit);
        }
        return res.send(success(200, {posts: posts.map(post => mapPostOutput(post, req._id))}));
    }catch(e){
        return res.send(error(500, e.message));
    }
}

const updatePostController = async (req, res) => {
    try{
        const {postId, caption, image} = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        if(!post){
            return res.send(error(404, 'Post not found'))
        }
        if(post.owner.toString() !== curUserId){
            return res.send(error(403, 'Only owners can update their posts'))
        }

        if(caption){
            post.caption = caption;
        }

        if(image){
            const cloudImg = await cloudinary.uploader.upload(image, {
                folder: 'postImg'
            })
            post.image = {
                url: cloudImg.secure_url,
                publicId: cloudImg.public_id
            }
        }

        await post.save();
        return res.send(success(200, {post}));

    }catch(e){
        return res.send(error(500, e.message));
    }
};

const deletePost = async (req, res) => {
    try{
        const {postId} = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        const curUser = await User.findById(curUserId);
        if(!post){
            return res.send(error(404, 'Post not found'))
        }
        if(post.owner.toString() !== curUserId){
            return res.send(error(403, 'Only owners can delete their posts'))
        }

        const index = curUser.posts.indexOf(postId); // removing post from user array also
        curUser.posts.splice(index, 1);
        await curUser.save();
        await post.remove();  // deleting post from post schema

        return res.send(success(200, 'post deleted successfully'));

    }catch(e){
        return res.send(error(500, e.message));
    }
};

const commentOnPost = async (req, res) => {
    try{
        const {postId, content} = req.body;
        const userId = req._id;
    
        const post = await Post.findById(postId);
        if(!post){
            return res.send(error(404, 'Post not found'));
        }

        const comment = {
            owner: userId,
            content
        }

        post.comments.push(comment);
        await post.save();

        return res.send(success(201, {comment}));
    }catch(e){
        return res.send(error(500, e.message));
    }
}

const getComments = async (req, res) => {
    try{
        const {postId} = req.body;

        const post = await Post.findById(postId);
        if(!post){
            return res.send(error(404, 'Post not found'));
        }

        const comments = await Post.findById(postId).populate('comments.content');
        return res.send(success(200, {comments}));
    }
    catch(e){
        return res.send(error(500, e.message));
    }
}

module.exports = {
    createPostController,
    likeAndUnlikePost,
    getAllPosts
}