function Comment({comment}) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <a href={comment.author.profileRef} className="comment-author">
          <img src={comment.author.image} className="comment-author-img" />
        </a>
        &nbsp;
        <a href={comment.author.profileRef} className="comment-author">
          {comment.author.username}
        </a>
        <span className="date-posted">{comment.createdAtDateStr}</span>
      </div>
    </div>
  );
}

function AddCommentForm() {
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src="http://i.imgur.com/Qr71crq.jpg"
          className="comment-author-img"
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
}

export default function CommentsLayout() {
  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
    profileRef: "/profile/Eric%20FSimons",
    image: "http://i.imgur.com/Qr71crq.jpg",
    bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
  };
  const comments = [
    {
      id: 0,
      createdAtDateStr: "Dec 29th",
      createdAt: "2024-01-24T18:09:35.521Z",
      updatedAt: "2024-01-24T18:09:35.521Z",
      body: "With supporting text below as a natural lead-in to additional content.",
      author: {
        username: "Jacob Schmidt",
        profileRef: "/profile/Jacob%20FSchmidt",
        bio: "string",
        image: "http://i.imgur.com/Qr71crq.jpg",
        following: true,
      },
    },
    {
      id: 0,
      createdAtDateStr: "Dec 29th",
      createdAt: "2024-01-24T18:09:35.521Z",
      updatedAt: "2024-01-24T18:09:35.521Z",
      body: "With supporting text below as a natural lead-in to additional content.",
      author: {
        username: "Jacob Schmidt",
        profileRef: "/profile/Jacob%20FSchmidt",
        bio: "string",
        image: "http://i.imgur.com/Qr71crq.jpg",
        following: true,
      },
    },
  ];

  return (
    <div>
      <AddCommentForm />

      {comments.map((it) => (
        <Comment comment={it} />
      ))}
    </div>
  );
}
