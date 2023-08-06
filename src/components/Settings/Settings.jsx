import React, { useEffect, useRef, useState } from "react";
import "./Settings.css";
import { Button, Form, Modal } from "react-bootstrap";
import useFirebase from "../../hooks/useFirebase";
import useFetch from "../../hooks/useFetch";
import Swal from "sweetalert2";

const Settings = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user, logOut } = useFirebase();
    const { data, getData, setDataLoading, patchData, postData, error, loading, deleteData } =
        useFetch();
    const [imageUpload, setImageUpload] = useState("") || {};
    const deleteUserRef = useRef();

    if (user?.email) {
      getData(
        `https://bloge-server.vercel.app/api/v1/users?email=${user?.email}`
      );
    }
    // console.log(data[0]);

    const handleProfileImage = async e => {
      setDataLoading(true);
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("key", "5ef8b75ebd5911a1ca073db6b222856d");
      formData.append("image", image);

      const imgUpload = await postData(
        "https://api.imgbb.com/1/upload",
        formData
      );
      if (imgUpload.status === 200) {
        setDataLoading(false);
        setImageUpload(imgUpload.data.data.url);
        console.log(imageUpload);
      }
    };

    const updateNameRef = useRef();

    const updatePassRef = useRef();
    // console.log(user?.email);

    const handleUpdateUserData = e => {
      e.preventDefault();
      const updateNameValue = updateNameRef.current.value;
      // const updateEmailValue = updateEmailRef.current.value;
      //const updatePassValue = updatePassRef.current.value;
      const img = imageUpload;
      const updatedUsertData = {
        name: updateNameValue,
        img,
      };
      console.log(updatedUsertData);
      if (user?.email) {
        patchData(
          `https://bloge-server.vercel.app/api/v1/users?email=${user?.email}`,
          updatedUsertData
        );
      }

      updateNameRef.current.value = "";
      // updateEmailRef.current.value = "";
      updatePassRef.current.value = "";
      // new Swal.fire(
      //     'Your Profile Information is Updated!',
      //     'success'
      //   )
      new Swal({
        title: "Hurray!",
        text: "Your Profile is successfully updated :)",
        icon: "success",
      });
    };

    const deleteUserHandler = async () => {
      const deleteText = deleteUserRef.current.value;
      if (deleteText === "DELETE") {
        await deleteData(
          `https://bloge-server.vercel.app/api/v1/users?email=${user?.email}`
        );
        await Swal.fire("Your Account is Deleted!", "success");

        logOut();
      } else {
        Swal.fire("Please type 'DELETE to delete your account'");
      }
    };
    return (
        <div className="settings container w-lg-75">
            <div className="settingsWrapper p-4">
                <div className="settingsTitle d-flex align-items-center justify-content-between">
                    <span className="settingsUpdateTitle mb-4">Update Your Account</span>
                    <span onClick={handleShow} className="settingsDeleteTitle text-danger">
                        Delete Your Account
                    </span>
                </div>
                <form className="settingsForm d-flex flex-column">
                    <label className="mb-2" htmlFor="">
                        Profile Picture
                    </label>
                    <div className="settingsPP d-flex align-items-center my-10 mx-0">
                        {imageUpload ? (
                            <img src={imageUpload ? imageUpload : data[0]?.img} alt="" />
                        ) : (
                            <i className=" fa-regular fa-user" style={{ fontSize: "35px" }}></i>
                        )}

                        <label htmlFor="fileInput">
                            <i className="settingsPpIcon d-flex align-items-center justify-content-center ms-2 fa-regular fa-circle-user"></i>
                        </label>
                        <input
                            onChange={handleProfileImage}
                            accept="image/*"
                            type="file"
                            name=""
                            id="fileInput"
                            style={{ display: "none" }}
                        />
                    </div>
                    <label>Username</label>
                    <input ref={updateNameRef} type="text" placeholder={data[0]?.name} />
                    <label>E-mail</label>
                    <input disabled type="email" placeholder={data[0]?.email} />
                    {/* <label>Password</label>
                    <input ref={updatePassRef} type="password" placeholder='Enter new password' /> */}
                    <button
                        type="submit"
                        onClick={handleUpdateUserData}
                        className="settingsSubmit text-white mt-4 btn btn-lg"
                    >
                        Update
                    </button>
                </form>

                {/* handle delete modal */}
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ fontSize: "18px" }}>
                            Are you sure you want to proceed? Remember this action cannot be undone{" "}
                            <i className="fa-solid fa-exclamation text-danger fw-bold"></i>
                        </p>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-danger">
                                Enter "DELETE" to Proceed
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="type 'DELETE'"
                                ref={deleteUserRef}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            style={{ color: "white", backgroundColor: "teal" }}
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="danger" onClick={deleteUserHandler}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Settings;
