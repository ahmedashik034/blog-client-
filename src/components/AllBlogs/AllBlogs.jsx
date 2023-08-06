import React from "react";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { Form, InputGroup, Row } from "react-bootstrap";
import {  useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { ClockLoader } from "react-spinners";
import BlogCard from "./BlogCard";
import Error from "../Error/Error";

const AllBlogs = () => {
    const [searchOption, setSearchOption] = useState();
    const [categoryFilter, setCategoryFilter] = useState([]) || {};
    const { data, getData, error, loading, patchData, deleteData, success } = useFetch();
    const location = useLocation();
    const category = location?.state;
    const blogData = location?.blogState;
    // console.log(blogData);

    useEffect(() => {
        if (category) {
            getData(`https://bloge-server.vercel.app/api/v1/blogs?category=${category}`);
        } else {
            getData(`https://bloge-server.vercel.app/api/v1/blogs`);
        }
    }, []);
    // console.log(data);

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    let content;

    const handleCategoryClick = (postCat) => {
        const categoryFilteredData = data?.filter((post) => {
            return post?.category[0] === postCat[0];
        });
        setCategoryFilter(categoryFilteredData);
    };
    console.log(categoryFilter);

    if (loading) {
        return (
            <div className="w-100 h-100 my-auto d-flex justify-content-center align-items-center mt-5">
                <ClockLoader
                    color="#E12454"
                    size={"300"}
                    loading={true}
                    css={override}
                    display={"block"}
                />
            </div>
        );
    }

    const searchHandler = (query) => {
        if (query) {
            // console.log(query)
            setSearchOption(query);
        }
        if (query === "") {
            setSearchOption(false);
        }
    };

    if (blogData) {
        content = (
            <Row className="mx-4">
                {blogData.map((post) => (
                    <BlogCard
                        post={post}
                        key={post._id}
                        handleCategoryClick={handleCategoryClick}
                    />
                ))}
            </Row>
        );
    }
    if (category) {
        content = (
            <Row className="mx-4">
                {data.map((post) => (
                    <BlogCard
                        post={post}
                        key={post._id}
                        handleCategoryClick={handleCategoryClick}
                    />
                ))}
            </Row>
        );
    }
    if (searchOption) {
        console.log(searchOption);
        const filteredData = data?.filter((singleData) => {
            // console.log(singleData.name.toLowerCase());
            return singleData.name.toLowerCase().includes(searchOption.toLowerCase());
        });
        console.log(filteredData);

        filteredData?.length === 0
            ? (content = <Error />)
            : (content = (
                <Row className="mx-4">
                    {filteredData?.map((post) => {
                        // console.log(post);
                        return (
                            <BlogCard
                                post={post}
                                key={post._id}
                                handleCategoryClick={handleCategoryClick}
                            />
                        );
                    })}
                </Row>
            ));
    }

    if (!blogData && !category && !searchOption) {
        content = (
            <Row className="mx-4">
                {data.map((post) => (
                    <BlogCard
                        post={post}
                        key={post._id}
                        handleCategoryClick={handleCategoryClick}
                    />
                ))}
            </Row>
        );
    }
    if (categoryFilter.length > 0) {
        content = (
            <Row className="mx-4">
                {categoryFilter?.map((post) => {
                    // console.log(post);
                    return (
                        <BlogCard
                            post={post}
                            key={post._id}
                            handleCategoryClick={handleCategoryClick}
                        />
                    );
                })}
            </Row>
        );
        console.log(content);
    }

    return (
        <div className="posts">
            <div className="">
                <InputGroup className="w-50 mx-auto my-5 d-flex align-items-center justify-content-center">
                    <Form.Control
                        style={{border: "2px solid teal"}}
                        onChange={(e) => {
                            console.log(e.target.value);
                            searchHandler(e.target.value);
                        }}
                        placeholder="Search by Blog Name"
                        type="text"
                        aria-label="Search"
                    />
                </InputGroup>
            </div>
            <div>{content}</div>
        </div>
    );
};

export default AllBlogs;
