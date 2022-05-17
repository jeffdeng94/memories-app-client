import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grow, Grid } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

import { useQuery, gql } from '@apollo/client'

export default function Home() {
  const GET_ALL_POSTS = gql`
    query GetPosts {
      posts {
        _id
        title
        message
        name
        tags
        selectedFile
        likes
        createdAt
        creator
      }
    }
  `
  const { data } = useQuery(GET_ALL_POSTS)

  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch({ type: 'FETCH_ALL', payload: data.posts })
    }
  }, [dispatch, data])
  return (
    <Grow in>
      <Container>
        <Grid
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              sm: 'column-reverse',
              md: 'row',
            },
          }}
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
