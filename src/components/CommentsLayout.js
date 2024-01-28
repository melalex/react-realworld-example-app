import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../features/user/userSlice";
import {
  addComment,
  commentSelectors,
  loadComments,
  selectCommentsStatus,
} from "../features/comment/commentSlice";
import {
  createUserProfileRef,
  handleAndPreventDefault,
  handleChangeWith,
  toMounthAndDayStr,
} from "../utils/utilityFunctions";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import useFetching from "../hooks/useFetching";
import { Link } from "react-router-dom";

function Comment({ commentId }) {
  const comment = useSelector((state) =>
    commentSelectors.selectById(state, commentId)
  );
  const authorProfileRef = createUserProfileRef(comment.author.username);

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={authorProfileRef} className="comment-author">
          <img src={comment.author.image} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link to={authorProfileRef} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {toMounthAndDayStr(comment.createdAt)}
        </span>
      </div>
    </div>
  );
}

function ActualAddCommentForm() {
  const user = useSelector(selectUser);
  const status = useSelector(selectCommentsStatus);
  const dispatch = useDispatch();
  const initialState = {
    body: "",
  };
  const [formData, setFormData] = useState(initialState);

  const onPost = () => {
    dispatch(addComment(formData));
    setFormData(initialState);
  };

  const handleChange = handleChangeWith(formData, setFormData);

  return (
    <form
      onSubmit={handleAndPreventDefault(onPost)}
      className="card comment-form"
    >
      <div className="card-block">
        <textarea
          value={formData.body}
          name="body"
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="card-footer">
        <img src={user.profile.image} className="comment-author-img" />
        <SubmitButton status={status} className="btn btn-sm btn-primary">
          Post Comment
        </SubmitButton>
      </div>
    </form>
  );
}

function AddCommentForm() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <ActualAddCommentForm />;
  } else {
    return <></>;
  }
}

export default function CommentsLayout() {
  const comments = useSelector(commentSelectors.selectIds);
  const status = useSelector(selectCommentsStatus);

  useFetching(status, loadComments);

  return (
    <div>
      <AddCommentForm />

      {comments.map((it) => (
        <Comment key={it} commentId={it} />
      ))}
    </div>
  );
}
