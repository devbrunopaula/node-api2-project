const express = require('express')
const controller = require('./post.controllers.js')

const router = express.Router()

router.route('/').get(controller.getAllPosts).post(controller.createPost)

router
  .route('/:id')
  .get(controller.getPostById)
  .delete(controller.deletePost)
  .put(controller.updatePost)

router
  .route('/:id/comments')
  .get(controller.getPostByIdComments)
  .post(controller.createPostById)

module.exports = router
