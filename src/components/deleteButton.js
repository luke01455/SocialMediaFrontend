import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy, res) {
        setConfirmOpen(false)
        //update all posts on component once a post is successfully deleted
        let data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
        })
        const resPosts = data.getPosts.filter(p => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [...resPosts]}})
        if(callback) callback()
    },
    variables: {
      postId
    }
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;
export default DeleteButton;
