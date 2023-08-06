import "./SinglePost.css";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import CommentModal from "../CommentModal/CommentModal";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import swal from "sweetalert";
import { useRef } from "react";
import axios from "axios";

const SinglePost = () => {
    const [userDetail, setUserDetail] = useState(null);
    const [showCommentBox, setshowCommentBox] = useState(true);
    const { data, getData, error, loading, patchData, deleteData, success } = useFetch();
    const { postId } = useParams();
    const { user } = useFirebase();

    // const commentEmailRef = useRef();
    const commentRef = useRef();

    const handleCategoryClick = postCat => {
      // navigate('/allBlogs');
      getData(
        `https://bloge-server.vercel.app/api/v1/blogs?category=${postCat}`
      );
    };
    useEffect(() => {
      getData(
        `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`
      );
    }, []);
    // console.log(comments);

    if (user?.email) {
      axios
        .get(
          `https://bloge-server.vercel.app/api/v1/users?email=${user?.email}`
        )
        .then(res => {
          const resData = res.data[0];
          setUserDetail(resData);
        })
        .catch(err => {
          console.log(err);
        });
    }

    const {
      _id,
      like_count,
      dislike_count,
      comments,
      title,
      description,
      category,
      img,
      name,
      post,
      email,
      author,
      createdAt,
      updatedAt,
    } = data[0] || {};

    // let likePost;
    // let disLikePost;

    const likeHandler = async (postId, email) => {
      const like = [...like_count];
      const disLike = [...dislike_count];
      if (!like?.includes(email)) {
        like?.push(email);
        await patchData(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          {
            like_count: like,
          }
        );
      } else {
        const newLike = like?.filter(likeItem => likeItem !== email);
        await patchData(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          {
            like_count: newLike,
          }
        );
      }

      if (disLike?.includes(email)) {
        const newDisLike = disLike?.filter(
          disLikeItem => disLikeItem !== email
        );
        await patchData(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          {
            dislike_count: newDisLike,
          }
        );
      }
      window.location.reload();
    };

    const disLikeHandler = async (postId, email) => {
      const like = [...like_count];
      const disLike = [...dislike_count];
      if (!disLike?.includes(email)) {
        disLike?.push(email);
        await patchData(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          {
            dislike_count: disLike,
          }
        );
      } else {
        const newDisLike = disLike?.filter(
          disLikeItem => disLikeItem !== email
        );
        await patchData(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          {
            dislike_count: newDisLike,
          }
        );
      }

      if (like?.includes(email)) {
        const newLike = like?.filter(likeItem => likeItem !== email);
        await patchData(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          {
            like_count: newLike,
          }
        );
      }
      window.location.reload();
    };

    const handleBlogDelete = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this blog!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          deleteData(
            `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`
          );
          swal("Poof! Your blog has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your blog is safe!");
        }
      });
    };

    const handleComment = e => {
      e.preventDefault();
      const commentValue = commentRef.current.value;
      const userCommentData = {
        comments: [
          ...comments,
          {
            name: userDetail.name,
            email: userDetail.email,
            comment: commentValue,
          },
        ],
      };
      // console.log(userCommentData);
      patchData(
        `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
        userCommentData
      );

      commentRef.current.value = "";
      // new Swal.fire(
      //     'Good job!',
      //     'Your comment is added!',
      //     'success'
      //   )
    };
    const content = post;
    return (
        <Card className="singlePost p-4 mb-4 mt-3">
            <div className="singlePostWrapper pe-0">
                <img src={img} alt="" className="singlePostImg w-100 rounded" />
            </div>
            <h1 className="singlePostTitle text-center m-2 fs-2 fw-bolder">
                {name}
                {user?.email === email && (
                    <div className="singlePostEdit float-end">
                        <Link className="text-decoration-none" to={`/update/${_id}`}>
                            <i className="singlePostIcon fa-regular fa-pen-to-square me-3"></i>
                        </Link>

                        <i
                            onClick={handleBlogDelete}
                            className="singlePostIcon fa-regular fa-trash-can me-2"
                        ></i>
                    </div>
                )}
            </h1>
            <div className="singlePostInfo mb-4 d-flex justify-content-between">
                <span className="singlePostAuthor">
                    Author: <b>{author}</b>
                </span>
                <span className="singlePostDate">
                    <Link className="text-decoration-none" to="/allBlogs" state={category}>
                        <span
                            onClick={() => handleCategoryClick(category)}
                            className="singlePostCategory me-4"
                        >
                            {category}
                        </span>
                    </Link>

                    {/* <span className="singlePostCategory me-4">{category}</span>{" "} */}
                    {new Date(createdAt).toDateString()}
                </span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: content }} className="singlePostDesc">
                {/* {post} */}
            </p>
            <Card.Footer className="cartFooter d-flex align-items-center justify-content-between w-100 position-relative border-bottom">
                {user?.auth && (
                    <i
                        onClick={() => likeHandler(_id, user?.email)}
                        className={
                            // "cartIcon reactedIcon cartIconOne fa-solid fa-heart position-absolute"
                            like_count?.includes(user?.email)
                                ? "cartIcon reactedIcon cartIconOne fa-solid fa-heart position-absolute"
                                : "cartIcon cartIconOne fa-regular fa-heart position-absolute"
                        }
                    ></i>
                )}
                <p className="mb-0 cartIconOneCount position-absolute">
                    {like_count?.length} Likes
                </p>

                {user?.auth && (
                    <i
                        onClick={() => disLikeHandler(_id, user?.email)}
                        className={
                            // "cartIcon cartIconTwo fa-regular fa-thumbs-down position-absolute"

                            dislike_count?.includes(user?.email)
                                ? "cartIcon reactedIcon cartIconTwo fa-solid fa-thumbs-down position-absolute"
                                : "cartIcon cartIconTwo fa-regular fa-thumbs-down position-absolute"
                        }
                    ></i>
                )}
                <p className="mb-0 cartIconTwoCount position-absolute">
                    {dislike_count?.length} Dislikes
                </p>

                <i
                    onClick={() => {
                        setshowCommentBox(!showCommentBox);
                        // setIsLiked(false);
                    }}
                    className="cartIcon cartIconThree fa-regular fa-comment position-absolute "
                ></i>
                <p className="mb-0 commentCount position-absolute">{comments?.length} Comments</p>
            </Card.Footer>

            {/* Comment section */}
            {showCommentBox && (
                <div className="commentBox">
                    <h3 className="mt-2">
                        <span>{comments?.length}</span> Comment
                    </h3>
                    <div className="">
                        <div className="w-100 d-flex justify-content-center">
                            <div className="w-100">
                                <div className="d-flex flex-column comment-section">
                                    {comments?.map((comment) => (
                                        <div className="bg-white p-2">
                                            <div className="d-flex flex-row">
                                                {user.img ? (
                                                    <img
                                                        className="rounded-circle  me-3"
                                                        alt=""
                                                        src={user.img}
                                                        width="40"
                                                    />
                                                ) : (
                                                    <i
                                                        className=" me-3 fa-regular fa-user mt-1"
                                                        style={{ fontSize: "25px" }}
                                                    ></i>
                                                )}

                                                <div className="d-flex flex-column justify-content-start ml-2">
                                                    <span className="d-block font-weight-bold name">
                                                        {/* {user?.displayName
                                                            ? user?.displayName : "Anonymous"} */}
                                                        {comment?.name
                                                            ? comment?.name
                                                            : comment?.email}
                                                    </span>
                                                    <span className="date text-black-50">
                                                        {new Date(
                                                            comment?.createdAt
                                                        ).toDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="comment-text">{comment?.comment}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-light p-2">
                                        <div className="d-flex flex-row align-items-start">
                                            {user?.auth ? (
                                                <img
                                                    className="rounded-circle me-3"
                                                    alt=""
                                                    src={user?.img}
                                                    width="40"
                                                />
                                            ) : (
                                                <i
                                                    className=" me-3 fa-regular fa-user mt-1"
                                                    style={{ fontSize: "25px" }}
                                                ></i>
                                            )}
                                            {user?.auth && (
                                                <textarea
                                                    ref={commentRef}
                                                    className="form-control ml-1 shadow-none textarea"
                                                ></textarea>
                                            )}
                                        </div>
                                        <div className="mt-2 d-flex justify-content-end">
                                            {user?.auth ? (
                                                <>
                                                    <button
                                                        className="btn btn-comment me-3 btn-sm shadow-none"
                                                        type="button"
                                                        // disabled = {!userDetail}
                                                        onClick={handleComment}
                                                    >
                                                        Post comment
                                                    </button>
                                                    <button
                                                        className="btn btn-comment-cancel btn-sm ml-1 shadow-none"
                                                        type="button"
                                                    >
                                                        Cancel
                                                    </button>{" "}
                                                </>
                                            ) : (
                                                <CommentModal data={data[0]}></CommentModal>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default SinglePost;
