import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { css } from "@emotion/react";
import useFirebase from "../../hooks/useFirebase";
import { ClockLoader } from "react-spinners";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const { dataLoading, userDetail } = useFirebase();
    const { data, getData, error, loading, patchData, deleteData, success } = useFetch();
    const [userData, setUserData] = useState();
    const navigate = useNavigate()
    useEffect(() => {
      getData(`https://bloge-server-devsobuj910.vercel.app/api/v1/blogs`);
    }, []);

    useEffect(() => {
      axios
        .get(
          `https://bloge-server-devsobuj910.vercel.app/api/v1/users?role=user`
        )
        .then(res => {
          const resData = res.data;
          setUserData(resData);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    console.log(userData);

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    if (dataLoading) {
        return (
            <ClockLoader
                color="#E12454"
                size={"300"}
                loading={true}
                css={override}
                display={"block"}
            />
        );
    }
    console.log(userDetail?.role);
    if (userDetail?.role === "user") {
        navigate("/");
    }
    else {
        return (
            <div className="adminDash container">
                <h1 className="dashTitle mt-5 shadow ps-4 py-2">Dashboard</h1>
                <div className="row g-5 py-5 mx-auto mt-2 mb-5 px-5">
                    {/* Blog Card */}
                    <div className="col-lg-6 col-12">
                        <Link className="p-0 m-0" style={{ textDecoration: "none" }} to="/admin/blogs">
                            <div className="card admin-card adminBlogCard shadow p-4">
                                <div className="card-body ">
                                    <h5 className="card-title text-center">Total Blogs</h5>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="">
                                            <h1 className="blogNum text-center">{data?.length}</h1>
                                            {/* <span className="text-success small pt-1 fw-bold">
                                                12%
                                            </span>{" "}
                                            <span className="text-muted small pt-2 ps-1">increase</span> */}
                                        </div>
                                        <div className="icon">
                                            <i className="fa-solid fa-house"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* User Card */}
                    <div className="col-lg-6 col-12">
                        <Link className="p-0 m-0" style={{ textDecoration: "none" }} to="/admin/users">
                            <div className="card admin-card adminUserCard shadow p-4">
                                <div className="card-body">
                                    <h5 className="card-title text-center">All Bloggers</h5>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="">
                                            <h1 className="userNum text-center">{userData?.length}</h1>
                                            {/* <span className="text-success small pt-1 fw-bold">
                                                8%
                                            </span>{" "}
                                            <span className="text-muted small pt-2 ps-1">increase</span> */}
                                        </div>
                                        <div className="icon">
                                            <i className="fa-solid fa-users"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

};

export default AdminDashboard;
