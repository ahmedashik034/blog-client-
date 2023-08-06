import React from 'react';
import postImg from '../../images/food.jpg';
import './TablePostDetail.css';

const TablePostDetail = () => {
    return (
        <div>
           
                   

                    <tr className="border-1">
                        <td className="p-3 ">
                            <h5 className=" text-center "> 1{ }</h5>
                        </td>
                        <td className="p-3 text-center">
                            <p className="text-center">John Smith{ }</p>
                        </td>
                        <td className="p-3 text-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="">
                                    <img style={{ width: '100px', height: '80px' }} className="rounded" src={postImg} alt="product-img" />
                                </div>
                                <p className="">{ }</p>
                            </div>
                        </td>

                        <td className="p-3 text-center">
                            <p className="text-center"> Lorem ipsum dolor sit amet. { }</p>
                        </td>
                        <td className="p-3 text-center">
                            {/* <Link
                                to={`/products/${_id}`}
                                state={product}
                                className="btn btn-circle text-primary hover:bg-primary hover:text-white hover:border-primary"
                            >
                                <i className="fa-solid fa-file-lines"></i>
                            </Link> */}
                            <p>Tech</p>
                        </td>
                        <td className="p-3 text-center">
                            {/* <input
                                type="checkbox"
                                className="toggle checked:toggle-error"
                                onClick={() => statusHandler(_id)}
                                checked={productStatus ? false : true}
                            /> */}
                            <p>2023-01-07 <br />
                                3:54:17</p>
                        </td>

                        <td className="py-3 px-3 text-center">
                            {/* {!productStatus ? (
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs text-center">
                                    Hidden
                                </span>
                            ) : (
                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs text-center">
                                    Published
                                </span>
                            )} */}
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ipsam...</p>
                        </td>
                        <td className="py-3 px-3 text-center">
                            <div className="d-flex align-items-center justify-content-center">

                                <div
                                    className=""
                                // onClick={() => deleteHandler(_id)}
                                >
                                    <i className="fa-regular fa-folder-open me-3"></i>
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>

                        </td>
                    </tr>
               
        </div>
    );
};

export default TablePostDetail;