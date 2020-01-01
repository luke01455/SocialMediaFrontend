import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'

const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            // on successful post submit, we then use the fetch post query and display it
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
			const new_post = result.data.createPost;
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getPosts: [new_post, ...data.getPosts] }
			});
            // reset the value body state on form
            values.body = ''
        }
    })

    function createPostCallback(){
        createPost()
    }

    return (
        <Form onSubmit={onSubmit}>
        <h2> Create a Post: </h2>
        <Form.Field>
            <Form.Input
            placeholder="Whats on your mind?"
            name="body"
            onChange={onChange}
            value={values.body}
            />
            <Button type="submit" color="teal"> Submit </Button>
        </Form.Field>
        </Form>
    );
};

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes {
            id
            username
            createdAt
        }
        likeCount
        comments {
            id body username createdAt
        }
        commentCount
    }
}
`

export default PostForm;
