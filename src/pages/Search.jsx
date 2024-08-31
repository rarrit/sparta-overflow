import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";

const Search = () => {
  const location = useLocation();
  const searchData = location.state?.searchData || "";
  const [searchPost, setSearchPost] = useState([]);
  console.log("posts정보??", searchPost);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Post").select("*");
      if (error) {
        console.log("error", error);
      } else {
        setSearchPost(data);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = searchPost.filter((post) => {
    return post.title.includes(searchData);
  });

  return (
    <>
      {searchData ? (
        filteredPosts.length > 0 ? (
          filteredPosts.map((data) => (
            <div key={data.id}>
              <div>{data.title}</div>
              <div>{data.description}</div>
              <div>
                {new Date(data.created_at)
                  .toLocaleDateString()
                  .replace(/\.$/, "")}
              </div>
            </div>
          ))
        ) : (
          <div>검색어가 없습니다.</div>
        )
      ) : (
        <div>검색어가 없습니다.</div>
      )}
    </>
  );
};

export default Search;

/*
- 검색어 없을시 : 검색어가 없습니다. (조건부 랜더링)
- 검색어 입력시
  - 입력값 저장 (useState)
  - 모든 포스트 데이터 값 가져오기 
  - 입력값이 포함되는 타이틀의 포스트 필터링
*/
