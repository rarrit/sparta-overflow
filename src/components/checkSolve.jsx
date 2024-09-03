// 실시간으로 solve 됐는지 안됐는지 확인
import { useEffect } from "react";
import supabase from "../services/supabaseClient";

const checkPostSolved = (setPosts) => {
  const checkSolve = supabase
    .from("Post")
    .on("UPDATE", (payload) => {
      console.log("Post updated:", payload);
      // 변경된 포스트 업데이트
      setPosts((prevPosts) => {
        // 업데이트된 포스트를 반영
        const updatedPosts = prevPosts.map((post) =>
          post.id === payload.new.id ? payload.new : post
        );
        return [...updatedPosts];
      });
    })
    .subscribe();
};
