import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";
import { CircleCheck, CircleX } from "lucide-react";
import { filterDateOnlyYMD } from "../utils/dateInfoFilter";

const Search = () => {
  const navigate = useNavigate();
  const { searchData, setSearchData, setSearchFocused } =
    useContext(dataContext);
  const [searchPost, setSearchPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select(
          `*, userinfo:userId (
          username,
          profileImage
        ),
        Comment:Comment!postId (id)`
        )
        .order("created_at", { ascending: false });
      if (error) {
        console.log("error", error);
      } else {
        setSearchPost(data);
        console.log("data", data);
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
    setSearchData("");
    setSearchFocused(false);
  };

  return (
    <StSearchListContainer>
      {searchData ? (
        filteredPosts.length > 0 ? (
          filteredPosts.map((data) => (
            <StSearchList key={data.id} onClick={() => handleDetailMove(data)}>
              <div>
                {data.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
              </div>
              <StSearchRight>
                <StSearchTitle>
                  <h2>{data.title}</h2>
                  <StSearchDataRow>
                    <div>{data.userinfo.username}</div>│
                    <div className="date">
                      {filterDateOnlyYMD(data.created_at)}
                    </div>
                  </StSearchDataRow>
                </StSearchTitle>
                <StSearchDescription>{data.description}</StSearchDescription>
              </StSearchRight>
            </StSearchList>
          ))
        ) : (
          <StSearchNoneData>검색어가 없습니다.</StSearchNoneData>
        )
      ) : (
        <StSearchNoneData>검색어가 없습니다.</StSearchNoneData>
      )}
    </StSearchListContainer>
  );
};

export default Search;

const StSearchListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  padding: 60px 0 30%;
`;
const StSearchList = styled.div`
  border: 3px solid #000;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  gap: 20px;
  cursor: pointer;
`;
const StStyledCircleCheck = styled(CircleCheck)`
  color: green;
  width: 30px;
  height: 30px;
`;

const StStyledCircleX = styled(CircleX)`
  color: red;
  width: 30px;
  height: 30px;
`;
const StSearchRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StSearchTitle = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  padding-bottom: 10px;

  & h2 {
    font-size: 20px;
    font-weight: 600;
    width: 80%;
  }

  & .date {
    font-weight: 600;
    color: #959595;
  }
`;

const StSearchDescription = styled.div`
  font-size: 15px;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StSearchNoneData = styled.div`
  text-align: center;
  padding: 30% 0;
`;
const StSearchDataRow = styled.div`
  display: flex;
`;
