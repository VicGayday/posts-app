import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PostItem from './PostItem'

const PostList = (props) => {
  if (!props.posts.length) {
      return <h1 style={{ textAlign: "center" }}>No posts are found</h1>
      }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{props.title}</h1>
      <TransitionGroup>
        {props.posts.map((it, index) => (
          <CSSTransition
            key={it.id}
            timeout={500}
            classNames="post"
            >
          <PostItem
            remove={props.remove}
            number={index + 1}
            post={it}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PostList