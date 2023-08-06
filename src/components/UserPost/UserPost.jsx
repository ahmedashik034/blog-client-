import React from 'react';
import './UserPost.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useFetch from '../../hooks/useFetch';

const UserPost = ({ userPost }) => {
    const content = userPost?.post;
    const { data, error, loading, patchData, deleteData, success } = useFetch();

    const handleBlogDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this blog!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteData(
                  `https://bloge-server-devsobuj910.vercel.app/api/v1/blogs?_id=${userPost?._id}`
                );
                swal("Poof! Your blog has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your blog is safe!");
            }
        });
    };
    return (
        <Card style={{ marginLeft: '5%', marginRight: '5%' }} className="mb-5">
            <div className='userPost p-4'>
                <div className="userPostWrapper pe-0">
                    <img src={userPost?.img} alt="" className="userPostImg w-100 rounded" />
                </div>
                <h1 className='userPostTitle text-center m-2 fs-2 fw-bolder'>{userPost?.name}
                    <div className="userPostEdit float-end">
                        <Link className="text-decoration-none" to={`/update/${userPost?._id}`}>
                            <i className="singlePostIcon fa-regular fa-pen-to-square me-3"></i>
                        </Link>                       
                         <i
                            onClick={handleBlogDelete}
                            className="userPostIcon fa-regular fa-trash-can me-2"
                        ></i>
                    </div>
                </h1>
                <div className='userPostInfo mb-4 d-flex justify-content-between'>
                    <span className="userPostAuthor">
                        Author: <b>{userPost?.author}</b>
                    </span>
                    <span className="userPostDate">
                        <span className='me-4'>{userPost?.category}</span>   {new Date(userPost?.createdAt).toDateString()}
                    </span>
                </div>
                <Link className='text-decoration-none' to={`/single/${userPost?._id}`}>
                    <p dangerouslySetInnerHTML={{ __html: content, }} className='userPostDesc'>
                        {/* {userPost?.post} */}
                    </p>
                </Link>
            </div>
            <Card.Footer className="cartFooter d-flex align-items-center justify-content-between w-100 border-bottom">
                <Link className='text-decoration-none' to={`/single/${userPost?._id}`}><p className="reactedCount mb-0">{userPost?.like_count?.length} likes</p></Link>
                <Link className='text-decoration-none' to={`/single/${userPost?._id}`}><p className="reactedCount mb-0">{userPost?.dislike_count?.length} dislikes</p></Link>
                <Link className='text-decoration-none' to={`/single/${userPost?._id}`}><p className="reactedCount mb-0">{userPost?.comments?.length} comments</p></Link>
            </Card.Footer>
        </Card>
    );
};

export default UserPost;