import { PostsError, PostsLoaded } from "../actions/posts";

const InitialState = {
  error: null,
  pages: 0,
  posts: [],
  votes: 0,
};

export default function posts(state = InitialState, action) {
  switch (action.type) {
    case PostsError: {
      return {
        ...state,
        error: action.error,
      };
    }

    case PostsLoaded: {
      return {
        ...state,
        error: null,
        pages: action.pages,
        posts: action.posts,
        votes: action.posts.reduce((prev, post) => {
          return prev + post.votes;
        }, 0),
      };
    }

    default:
      return state;
  }
}
