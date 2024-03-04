// import articles from "../data/data.json";

const LOAD_ARTICLES = "article/loadArticles";
const ADD_ARTICLE = "article/addArticle";

export const loadArticles = (articles) => {
  return {
    type: LOAD_ARTICLES,
    articles,
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article,
  };
};

export function writeArticle(article) {
  article = JSON.stringify(article);
  return async (dispatch) => {
    const response = await fetch("api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: article,
    });

    if (response.ok) {
      const payload = await response.json();
      dispatch(addArticle(payload));
    }
  };
}

export function fetchArticles() {
  return async (dispatch) => {
    const response = await fetch("/api/articles");

    if (response.ok) {
      const articles = await response.json();
      dispatch(loadArticles(articles));
    }
  };
}

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;
