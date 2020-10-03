const Posts = require('../../data/db.js')

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find()
    res.status(200).json({posts: allPosts})
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error Viewing Posts',
    })
  }
}

const getPostById = async (req, res) => {
  const {id} = req.params
  const findPost = await Posts.findById(id)

  if (!findPost.length)
    return res
      .status(404)
      .json({message: 'The post with the specified ID does not exist.'})

  try {
    res.status(200).json(findPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'The post information could not be retrieved.',
    })
  }
}

const createPost = async (req, res) => {
  const {title, contents} = req.body
  if (!title || !contents)
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    })

  try {
    const createPost = await Posts.insert(req.body)
    res.status(201).json(createPost)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({error: 'There was an error while saving the post to the database'})
  }
}

const createPostById = async (req, res) => {
  const {id} = req.params
  const {text} = req.body
  const findPost = await Posts.findById(id)

  if (!findPost.length)
    return res
      .status(404)
      .json({message: 'The post with the specified ID does not exist.'})

  if (!text)
    return res.status(400).json({
      errorMessage: 'Please provide text for the comment.',
    })

  try {
    const newComment = await Posts.insertComment({
      text,
      post_id: id,
    })

    if (newComment) {
      res.status(201).json({newComment, comment: text})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error while saving the comment to the database',
    })
  }
}

const getPostByIdComments = async (req, res) => {
  const {id} = req.params
  const {text} = req.body
  const findId = await Posts.findById(id)

  if (!findId.length)
    return res
      .status(404)
      .json({message: 'The post with the specified ID does not exist.'})

  try {
    const findPosts = await Posts.findPostComments(id)
    res.status(200).json(findPosts)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({error: 'The comments information could not be retrieved.'})
  }
}

const deletePost = async (req, res) => {
  const {id} = req.params
  const findId = await Posts.findById(id)

  if (!findId.length)
    return res
      .status(404)
      .json({message: 'The post with the specified ID does not exist.'})

  try {
    const deletePost = await Posts.remove(id)
    if (deletePost === 1) {
      res.status(200).json({message: `Post the the ID ${id} has been removed`})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'The post could not be removed'})
  }
}

const updatePost = async (req, res) => {
  const {id} = req.params
  const findId = await Posts.findById(id)
  const text = req.body
  console.log(text)
  if (!findId.length)
    return res
      .status(404)
      .json({message: 'The post with the specified ID does not exist.'})

  if (!text)
    return res.status(400).json({
      errorMessage:
        'request Body cannot be empty, provide title and contents properties.',
    })

  if (!text.title || !text.contents)
    return res
      .status(400)
      .json({errorMessage: 'Please provide title and contents for the post.'})

  try {
    const updatedPost = {
      title: text.title ? text.title : findId.title,
      contents: text.contents ? text.contents : findId.contents,
    }

    const newUpdatedPost = await Posts.update(id, updatedPost)

    res.status(200).json({message: 'Post Updated', updatedPost})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'The post could not be updated'})
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  createPostById,
  getPostByIdComments,
  deletePost,
  updatePost,
}
