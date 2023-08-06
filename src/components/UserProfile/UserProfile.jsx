import React, { useState } from "react";
import "./UseProfile.css";
import UserPost from "../UserPost/UserPost";
import useFirebase from "../../hooks/useFirebase";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { user, updateName } = useFirebase();
    const { data, getData, error, loading } = useFetch();
    const [userDetail, setUserDetail] = useState([]);
    const { userId } = useParams();

    // console.log(user?.email);
    // console.log(data);

    if (user?.email) {
        axios
            .get(`https://bloge-server.vercel.app/api/v1/users?_id=${userId}`)
            .then((res) => {
                const resData = res.data[0];
                setUserDetail(resData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (user?.email) {
        getData(`https://bloge-server.vercel.app/api/v1/blogs?email=${userDetail?.email}`);
    }
    //   console.log(userDetail);

    if (loading) {
        return "loading";
    }
    return (
        <div className="userProfile mt-4 mb-5">
            <div className="profileInfo d-flex align-items-center justify-content-start shadow pb-2">
                {userDetail?.img ? (
                    <img className="userPp ms-5" src={userDetail?.img} alt="" />
                ) : (
                    <i className=" fa-regular fa-user ms-5 ps-2" style={{ fontSize: "55px" }}></i>
                )}

                {/* <img className='userPp  ms-5' src={pp} alt="" /> */}
                <div className="userInfo  ms-5">
                    <h4 className="infoName">{userDetail?.name}</h4>
                    <div className="d-flex align-items-center justify-content-start">
                        <i className="fa-solid fa-envelope infoMailIcon me-2"></i>
                        <p className="mb-0 infoMail">{userDetail?.email}</p>
                    </div>
                </div>
            </div>
            <h1 className="recentBlog mt-5 ps-5 shadow mb-3">{userDetail?.name}'s Blogs</h1>
            <div className="container pt-5 px-5">
                {data?.length > 0 && !data?.message ? (
                    data?.map((userPost) => (
                        <UserPost key={userPost?._id} userPost={userPost}></UserPost>
                    ))
                ) : (
                    <h5>You have no blogs yet!!</h5>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
