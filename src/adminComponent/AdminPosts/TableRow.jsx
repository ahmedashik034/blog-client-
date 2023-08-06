import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({post,handleBlogDelete}) => {
    return (
        <tr className="border-1">
                            <td className="p-3 ">
                                <p className=" text-center ">{post?._id}</p>
                            </td>
                            <td className="p-3 text-center">
                                <p className="text-center">{post?.author}</p>
                            </td>
                            <td className="p-3 text-center">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="">
                                        <img
                                            style={{ width: "100px", height: "80px" }}
                                            className="rounded"
                                            src={post?.img}
                                            alt="product-img"
                                        />
                                    </div>
                                </div>
                            </td>

                            <td className="p-3 text-center">
                                <p className="text-center">{post?.name} </p>
                            </td>
                            <td className="p-3 text-center">
                                <p>{post?.category}</p>
                            </td>
                            <td className="p-3 text-center">
                                <p>{new Date(post?.createdAt).toDateString()}</p>
                            </td>

                            <td className="adminPostText 3 text-center">
                                <p
                                    dangerouslySetInnerHTML={{ __html: post?.post }}
                                    className="mt-4"
                                ></p>
                            </td>
                            <td className="py-3 px-3 text-center">
                                <div className="d-flex align-ite px-ms-center justify-content-center">
                                    <div
                                        className=""
                                        // onClick={() => deleteHandler(_id)}
                                    >
                                        <Link
                                            className="text-decoration-none"
                                            to={`/single/${post._id}`}
                                        >
                                            <i className="postAction postActionOpen fa-regular fa-folder-open me-4"></i>
                                        </Link>

                                        <i
                                            onClick={() => handleBlogDelete(post?._id)}
                                            className="postAction postActionDelete fa-solid fa-trash-can"
                                        ></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
    );
};

export default TableRow;