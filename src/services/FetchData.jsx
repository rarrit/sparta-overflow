import { useState, useEffect } from "react";
import supabase from "./supabaseClient";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Users").select("*");
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("user data =>", data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Post").select("*");
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setPosts(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Comment").select("*");
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("comment data =>", data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="aaa">
      {users.map((user) => {
        return <div key={user.id}>{user.username}</div>;
      })}
    </div>
  );
};

export default FetchData;
