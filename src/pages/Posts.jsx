import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import "../styles/App.css";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal.jsx";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import Postservice from "../API/Postservice";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()

  const [getPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await Postservice.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

    useEffect(() => {
    getPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton onClick={getPosts}>
        GET POSTS
      </MyButton>
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Add new User
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Some error occured ${postError}</h1>}

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Quantity of elements on page"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "All posts" },
        ]}
      />

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts List"
      />
      <div ref={lastElement} style={{ height: 20 }} />

      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts