import React from "react";
import "./AdminPosts.css";
import { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";

const AdminPosts = () => {
    const [filter, setFilter] = useState(false);

    //search by date handle state
    const [disable, setDisable] = useState(true);
    const [toDate, setToDate] = useState([]);
    const [fromDate, setFromDate] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);

    const [toDateFormat, setToDateFormat] = useState("");
    const [fromDateFormat, setFromDateFormat] = useState("");
    const [blogsData, setBlogsData] = useState([]);
    //
    const { data, getData, error, dataLoading, patchData, deleteData, success } = useFetch();
    useEffect(() => {
      getData("https://bloge-server.vercel.app/api/v1/blogs");
    }, []);
    // console.log(data);
    const handleBlogDelete = postId => {
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

    // filter data by category

    const handleCategoryClick = postCat => {
      console.log(postCat);
      const categoryFilteredData = data?.filter(post => {
        console.log(post?.category[0]);
        return post?.category[0] === postCat;
      });
      setCategoryFilter(categoryFilteredData);
    };
    console.log(categoryFilter);

    //handle search by date
    const handleToDate = e => {
      setToDate(e.target.value);
    };
    const handleFromDate = e => {
      setFromDate(e.target.value);
      setDisable(false);
    };

    const handleFilterSubmit = e => {
      e.preventDefault();
      // alert("todate"+ toDate + "from date" + fromDate);

      axios
        .get(
          `https://bloge-server.vercel.app/api/v1/blogs?toDate=${toDate}&fromDate=${fromDate}`
        )

        .then(res => {
          const resData = res.data;
          setBlogsData(resData);
        })
        .catch(err => {
          console.log(err);
        });
    };

    // console.log(blogsData);
    let content;

    if (dataLoading) {
        content = <h1>loading...</h1>;
    }

    if (blogsData) {
        content = blogsData?.map((post) => (
            <TableRow key={post._id} post={post} handleBlogDelete={handleBlogDelete} />
        ));
    }

    if (blogsData.length === 0 && data) {
        content = data?.map((post) => (
            <TableRow key={post._id} post={post} handleBlogDelete={handleBlogDelete} />
        ));
    }
    // console.log(data);
    if (data?.length === 0) {
        content = <h2 className="text-center">No Blogs Found</h2>;
    }

    if (categoryFilter.length > 0) {
        content = categoryFilter?.map((post) => (
            <TableRow key={post._id} post={post} handleBlogDelete={handleBlogDelete} />
        ));
    }
    

    return (
        <div className="container mt-5">
            <h2 className="manageBlogTitle shadow mb-5 ps-4 py-2">Manage Blogs</h2>
            <div className="d-flex align-items-center justify-content-end">
                <button onClick={() => setFilter(!filter)} className="px-3 py-1 me-4 filterBtn">
                    <i className="fa-solid fa-sliders me-2"></i>Filter
                </button>
            </div>
            {filter && (
                <Accordion className="w-50 ms-auto mt-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            {" "}
                            <button className="filterByDate px-3 py-2 rounded">
                                <i className="fa-regular fa-calendar-days me-3"></i>Filter by Date
                            </button>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit={handleFilterSubmit}>
                                <div className="d-flex justify-content-end align-items-center">
                                    <input
                                        className="me-3"
                                        placeholder="dd-mm-yyyy"
                                        type="date"
                                        name="toDate"
                                        onChange={(e) => handleFromDate(e)}
                                    />
                                    <p className="mb-0">to</p>
                                    <input
                                        className="mx-3"
                                        placeholder="dd-mm-yyyy"
                                        type="date"
                                        name="fromDate"
                                        onChange={(e) => handleToDate(e)}
                                        disabled={disable}
                                        min={fromDate}
                                    />
                                    <Button
                                        className="homeCommentBtn me-2 mb-2"
                                        type="submit"
                                        value="Submit"
                                    >
                                        Filter
                                    </Button>
                                </div>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <button className="filterByCategory px-3 py-2 rounded">
                                <i className=" fa-regular fa-rectangle-list me-3"></i>Filter by
                                Category
                            </button>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul className="filterCatList">
                                <li
                                    className="filterCatListItem d-inline-block w-50 mt-2"
                                    onClick={() => handleCategoryClick("Life")}
                                >
                                    Lifestyle
                                </li>
                                <li
                                    className="filterCatListItem d-inline-block w-50 mt-2"
                                    onClick={() => handleCategoryClick("Photography")}
                                >
                                    Photography
                                </li>
                                <li
                                    className="filterCatListItem d-inline-block w-50 mt-2"
                                    onClick={() => handleCategoryClick("Sports")}
                                >
                                    Sports
                                </li>
                                <li
                                    className="filterCatListItem d-inline-block w-50 mt-2"
                                    onClick={() => handleCategoryClick("Movie")}
                                >
                                    Movie
                                </li>
                                <li
                                    className="filterCatListItem d-inline-block w-50 mt-2"
                                    onClick={() => handleCategoryClick("Tech")}
                                >
                                    Tech
                                </li>
                                <li
                                    className="filterCatListItem d-inline-block w-50 mt-2"
                                    onClick={() => handleCategoryClick("Food")}
                                >
                                    Food
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
            <table style={{ tableLayout: "fixed" }} className="my-4">
                <thead>
                    <tr className="bg-dark bg-opacity-25">
                        <th className="py-3 px-3 text-center">ID</th>
                        <th className="py-3 px-3 text-center">AUTHOR</th>
                        <th className="py-3 px-3 text-center">IMAGE</th>
                        <th className="py-3 px-3 text-center">TITLE</th>
                        <th className="py-3 px-3 text-center">CATEGORY</th>
                        <th className="py-3 px-3 text-center">POSTED AT</th>
                        <th className="py-3 px-3 text-center">DESCRIPTION</th>
                        <th className="py-3 px-3 text-center">ACTIONS</th>
                    </tr>
                </thead>

                <tbody className="w-100">{content}</tbody>
            </table>
        </div>
    );
};

export default AdminPosts;
