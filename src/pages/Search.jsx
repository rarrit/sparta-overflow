import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state?.searchData || "";
  // const setSearchData = location.state?.setSearchData || (() => {});
  const [searchPost, setSearchPost] = useState([]);

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

  //검색어 포함된거 필터링
  const filteredPosts = searchPost.filter((post) => {
    return post.title.includes(searchData);
  });

  const handleDetailMove = (post) => {
    navigate(`/detail/${post.id}`);
    // setSearchData("");
  };

  return (
    <>
      {searchData ? (
        filteredPosts.length > 0 ? (
          filteredPosts.map((data) => (
            <div key={data.id} onClick={() => handleDetailMove(data)}>
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
