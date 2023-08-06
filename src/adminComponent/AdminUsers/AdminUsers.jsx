import React, { useState } from "react";
import "./AdminUsers.css";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import Error from "../../components/Error/Error";
import UserTableRow from "./UserTableRow";

const AdminUsers = () => {
    const [searchOption, setSearchOption] = useState();
    const [sortOrder, setSortOrder] = useState("asc");
    const { data, getData, error, loading, patchData, deleteData, success } = useFetch();
    useEffect(() => {
        getData("https://bloge-server.vercel.app/api/v1/users?role=user");
    }, []);

    let content;
    const searchUserHandler = (query) => {
        if (query) {
            setSearchOption(query);
        }
        if (query === "") {
            setSearchOption(false);
        }
    };
    const handleUserDelete = (userId) => {
        swal({
            title: "Are you sure?",
            text: "If you proceed, this user will be permanently removed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteData(`https://bloge-server.vercel.app/api/v1/users?_id=${userId}`);
                swal("Poof! The user has been removed!", {
                    icon: "success",
                });
            } else {
                swal("The user is safe!");
            }
        });
    };

    const handleSort = () => {
        const sortedData = data.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSearchOption(false);
    };

    if (searchOption) {
        const filteredData = data?.filter((singleData) => {
            return (
                singleData.name.toLowerCase().includes(searchOption.toLowerCase()) ||
                singleData.email.toLowerCase().includes(searchOption.toLowerCase())
            );
        });

        filteredData?.length === 0
            ? (content = (
                  <div className="">
                      <Error />
                  </div>
              ))
            : (content = (
                  <UserTableRow
                      data={filteredData}
                      handleUserDelete={handleUserDelete}
                  ></UserTableRow>
              ));
    }
    if (!searchOption) {
        content = <UserTableRow data={data} handleUserDelete={handleUserDelete}></UserTableRow>;
    }
    return (
        <div className="container mt-5">
            <h2 className="mb-5 manageBloggersTitle shadow ps-4 py-2">Manage Bloggers</h2>
            <div className="d-flex align-items-center justify-content-end mb-3">
                <InputGroup className="w-50 mx-auto my-5 d-flex align-items-center justify-content-center">
                    <Form.Control
                        style={{ border: "2px solid teal" }}
                        onChange={(e) => {
                            searchUserHandler(e.target.value);
                        }}
                        placeholder="Search by User Name"
                        type="text"
                        aria-label="Search"
                    />
                </InputGroup>
                <button className="px-3 py-1 sortBtn" onClick={handleSort}>
                    <i
                        className={`fa-solid fa-arrow-${
                            sortOrder === "asc" ? "up" : "down"
                        }-wide-short me-2`}
                    ></i>
                    Sort
                </button>
            </div>

            <div className="table-responsive">
                <table
                    style={{ tableLayout: "fixed" }}
                    className="userTable table table-light table-striped table-hover"
                >
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">USER NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">JOINED AT</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    {content}
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
