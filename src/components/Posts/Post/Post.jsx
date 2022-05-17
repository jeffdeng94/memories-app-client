import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core'
import moment from 'moment'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import useStyles from './styles'

import { useMutation, gql } from '@apollo/client'
import { DELETE, UPDATE } from '../../../constants/actionTypes'

const POST_DELETE = gql`
  mutation PostDelete($postId: ID!) {
    postDelete(postId: $postId) {
      error {
        message
      }
      post {
        _id
      }
    }
  }
`
const POST_LIKE = gql`
  mutation PostLike($postId: ID!) {
    postLike(postId: $postId) {
      error {
        message
      }
      post {
        _id
        title
        message
        name
        creator
        tags
        selectedFile
        likes
        createdAt
      }
    }
  }
`

export default function Post({ post, setCurrentId }) {
  const [PostDelete] = useMutation(POST_DELETE)
  const [PostLike] = useMutation(POST_LIKE)

  const dispatch = useDispatch()
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
  const auth = useSelector(state => state.auth)

  const handlePostDelete = async postId => {
    try {
      const {
        data: { postDelete },
      } = await PostDelete({ variables: { postId } })

      if (postDelete.error) {
        console.log(postDelete.error)
      } else {
        dispatch({ type: DELETE, payload: postId })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePostLike = async postId => {
    try {
      const {
        data: { postLike },
      } = await PostLike({ variables: { postId } })

      if (postLike.error) {
        console.log(postLike.error)
      } else {
        dispatch({ type: UPDATE, payload: postLike.post })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        like => like === (user?.userInfo?.googleId || user?.userInfo?.id),
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    )
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile
            ? post.selectedFile
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.userInfo?.googleId === post?.creator ||
          user?.userInfo?.id === post?.creator) &&
          auth.authData && (
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon />
            </Button>
          )}
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map(tag => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant='h5' className={classes.title} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            handlePostLike(post._id)
          }}
        >
          <Likes />
        </Button>
        {(user?.userInfo?.googleId === post?.creator ||
          user?.userInfo?.id === post?.creator) &&
          auth.authData && (
            <Button
              size='small'
              color='primary'
              onClick={() => {
                handlePostDelete(post._id)
              }}
            >
              <DeleteIcon fontSize='small' />
              Delete
            </Button>
          )}
      </CardActions>
    </Card>
  )
}
