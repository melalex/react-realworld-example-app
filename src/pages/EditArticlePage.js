import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import {
  handleAndPreventDefault,
  handleChangeWith,
  handleWithoutPropagation,
} from "../utils/utilityFunctions";
import {
  loadOneArticle,
  reInitArticles,
  selectArticleById,
  selectArticleListErrors,
  selectArticleListStatus,
} from "../features/article/articleSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SubmitButton from "../components/SubmitButton";
import { createArticle, editArticle } from "../features/article/articleSlice";
import { reInitProfile } from "../features/profile/profileSlice";

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

export default function EditArticlePage({ createNew }) {
  const initialState = {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    focusedTag: "",
  };
  const { slug } = useParams();
  const prevValue = useSelector((state) => selectArticleById(state, slug));

  const article = createNew
    ? initialState
    : {
        ...initialState,
        ...prevValue,
      };
  const errors = useSelector(selectArticleListErrors);
  const status = useSelector(selectArticleListStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(article);

  const handleChange = handleChangeWith(formData, setFormData);

  const removeTag = (tag) => {
    const newFromData = {
      ...formData,
      tagList: formData.tagList.filter((it) => it !== tag),
    };

    setFormData(newFromData);
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      const focusedTag = formData.focusedTag;
      const newFromData = {
        ...formData,
        tagList: [...formData.tagList, focusedTag],
        focusedTag: "",
      };

      setFormData(newFromData);
    }
  };

  const onSave = async () => {
    const promise = createNew
      ? dispatch(createArticle(formData))
      : dispatch(editArticle({ slug, formData }));

    promise
      .unwrap()
      .then((it) => {
        dispatch(reInitArticles());
        dispatch(reInitProfile());
        navigate(`/article/${it.article.slug}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (formData.slug === "" && !createNew) {
      dispatch(loadOneArticle(slug));
    }
  }, [formData, slug, createNew]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorMessage errors={errors} />

            <form onSubmit={handleAndPreventDefault(onSave)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    value={formData.title}
                    name="title"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={formData.description}
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    value={formData.body}
                    name="body"
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    onChange={handleChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={formData.focusedTag}
                    name="focusedTag"
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                  />
                  <div className="tag-list">
                    {formData.tagList.map((it) => (
                      <RemovableTag key={it} tag={it} removeTag={removeTag} />
                    ))}
                  </div>
                </fieldset>
                <SubmitButton
                  status={status}
                  className="btn btn-lg pull-xs-right btn-primary"
                >
                  Publish Article
                </SubmitButton>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
