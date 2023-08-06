import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Post from "../Post/Post";
import "./Posts.css";
import useFetch from "../../hooks/useFetch";

const Posts = () => {
  const { data, getData, error, loading } = useFetch();

  useEffect(() => {
    getData(`https://bloge-server-devsobuj910.vercel.app/api/v1/blogs`);
  }, []);

  // console.log(data);
  const blogData = data;
  const reversedData = blogData?.reverse();
  // console.log(reversedData);
  return (
    <div className="posts">
      <Row className="mx-4">
        {reversedData.slice(0, 6)?.map(post => (
          <Post key={post._id} post={post}></Post>
        ))}
      </Row>
      {/* <button className='btn btn-lg d-flex mx-auto text-white showMoreBtn px-5 mb-3'>Show More</button> */}
    </div>
  );
};

export default Posts;
