import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { handleWithoutPropagation } from "../utils/utilityFunctions";

function RemovableTag({ tag, removeTag }) {
  return (
    <span className="tag-default tag-pill">
      {" "}
      <i
        className="ion-close-round"
        onClick={handleWithoutPropagation(() => removeTag(tag))}
      ></i>{" "}
      {tag + " "}
    </span>
  );
}

function EditArticlePageContent({ errors, article }) {
  const removeTag = (tag) => alert("remove " + tag);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(article.focusedTag);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorMessage errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={article.title}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={article.description}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    defaultValue={article.body}
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={article.focusedTag}
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyDown={handleKeyDown}
                  />
                  <div className="tag-list">
                    {article.tagList.map((it) => (
                      <RemovableTag tag={it} removeTag={removeTag} />
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditArticlePage() {
  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
    image: "http://i.imgur.com/Qr71crq.jpg",
    bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
  };

  const article = {
    slug: "the-song-you",
    title: "The song you won't ever stop singing. No matter how hard you try.",
    description: "This is the description for the post.",
    body: "string",
    tagList: ["realworld", "implementations"],
    focusedTag: "new tag",
  };

  return (
    <div>
      <Header user={user} />
      <EditArticlePageContent errors={[]} article={article} />
      <Footer />
    </div>
  );
}
