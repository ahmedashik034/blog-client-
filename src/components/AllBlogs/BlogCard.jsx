import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const BlogCard = ({ post, handleCategoryClick }) => {
    return (
        <Col xs={12} md={6} lg={4}>
            <Card className="post mt-4 mb-5 mx-3 shadow">
                {post.img && <img className="postImg w-100 rounded mb-2" src={post?.img} alt="" />}

                <div className="postInfo d-flex flex-column align-items-center">
                    <div className="postCats">
                        <span data-toggle="tooltip" data-placement="top" title="Click to see more in this category" 
                            onClick={() => handleCategoryClick(post?.category)}
                            className="postCat mt-3 me-2"
                        >
                            {post?.category}
                        </span>
                    </div>
                    <span className="postTitle mt-2">{post?.name}</span>
                    <span className="postDate mt-1">
                        {new Date(post?.createdAt).toDateString()}
                    </span>
                    <p
                        dangerouslySetInnerHTML={{ __html: post?.post }}
                        className="postDesc mt-3 w-100 px-3"
                    ></p>
                </div>
                <Link className="text-decoration-none" to={`/single/${post?._id}`}>
                    <div className="d-flex align-items-center justify-content-end ">
                        <button className="btn-read-blog mb-3 me-3 mt-0">
                            <span>Read Blog</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </Link>

                <Card.Footer className="cartFooter d-flex align-items-center justify-content-between w-100 border-bottom">
                    <Link className="text-decoration-none" to={`/single/${post?._id}`}>
                        <p className="reactedCount mb-0">{post?.like_count?.length} likes</p>
                    </Link>
                    <Link className="text-decoration-none" to={`/single/${post?._id}`}>
                        <p className="reactedCount mb-0">{post?.dislike_count?.length} dislikes</p>
                    </Link>
                    <Link className="text-decoration-none" to={`/single/${post?._id}`}>
                        <p className="reactedCount mb-0">{post?.comments.length} comments</p>
                    </Link>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default BlogCard;
