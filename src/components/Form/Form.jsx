import React,{useState, useEffect} from 'react'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'

import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'  

export default function Form( {currentId, setCurrentId}) {

  const post = useSelector(state=>currentId?state.posts.find(p=>p._id===currentId):null)

  const auth = useSelector(state=>state.auth)

  const [postData, setPostData]=useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })

  const classes = useStyles()

  const user = JSON.parse(localStorage.getItem('profile'))

  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(post){
      setPostData(post)
    }
  }, [post])

  const clear = ()=>{
    setCurrentId(null)
    setPostData(
      {
        title:'',
        message:'',
        tags:'',
        selectedFile:''
      }
    )
}

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(currentId){
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
    } else{
      dispatch(createPost({...postData,name:user?.result?.name}))
    }
    clear()
  }

  //user signout, redux state changes, rerender form component
  if(!auth.authData && !user?.result){
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId? 'Editing':'Creating'} a Memory</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={e=>setPostData({...postData,title:e.target.value})}></TextField>
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={e=>setPostData({...postData,message:e.target.value})}></TextField>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={e=>setPostData({...postData,tags:e.target.value.split(',')})}></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            mulitple={false}
            onDone={({base64})=>setPostData({...postData, selectedFile:base64})}
            />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}
