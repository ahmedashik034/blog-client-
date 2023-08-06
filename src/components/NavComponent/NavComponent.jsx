import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import "./NavComponent.css";
import {  Dropdown } from "react-bootstrap";
import useFirebase from "../../hooks/useFirebase";
import useFetch from "../../hooks/useFetch";


function NavComponent() {
    const { logOut, user, userDetail } = useFirebase();
    const { data, getData } = useFetch();
    
    if (user?.email) {
        getData(`https://bloge-server.vercel.app/api/v1/users?email=${user?.email}`);
    }
    // const handleSearch = async () => {
    //     const searchValue = searchRef.current.value;
    //     console.log(searchValue);

    //     // navigate('/allBlogs');
    //     await axios
    //         .get(`https://bloge-server.vercel.app/api/v1/blogs`)
    //         .then((res) => {
    //             const resData = res.data;
    //             //    console.log(resData)

    //             const filteredData = resData?.filter((singleResData) => {
    //                 //console.log(data.name.toLowerCase());
    //                 return singleResData?.name?.toLowerCase().includes(searchValue?.toLowerCase());
    //             });
    //             // setBlogData(filteredData);
    //             // console.log(blogData);
    //             return filteredData;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    return (
        <Navbar
            className="top sticky-top d-flex align-items-center justify-content-center"
            expand="lg"
        >
            <Container className="m-0">
                <div className="col-3">
                    <Navbar.Brand className="topLeft d-flex align-items-center justify-content-start me-0">
                        <Nav.Link as={Link} to="/home" className="logo d-flex align-items-center">
                            <h3 className="appLogo">
                                BlogBook<span className="logoDot">.</span>
                            </h3>
                        </Nav.Link>
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="topCenter  ">
                        <Nav className="topList d-flex justify-content-center align-items-center">
                            <NavLink
                                to="/"
                                style={({ isActive }) => {
                                    return { borderBottom: isActive ? "2px solid goldenRod" : "" };
                                }}
                                className="topListItem listmargin"
                            >
                                <li>HOME</li>
                            </NavLink>
                            <NavLink
                                to="/about"
                                style={({ isActive }) => {
                                    return { borderBottom: isActive ? "2px solid goldenRod" : "" };
                                }}
                                className="topListItem listmargin"
                            >
                                <li>ABOUT</li>
                            </NavLink>
                            <NavLink
                                to="/contact"
                                style={({ isActive }) => {
                                    return { borderBottom: isActive ? "2px solid goldenRod" : "" };
                                }}
                                className="topListItem listmargin"
                            >
                                <li>CONTACT</li>
                            </NavLink>
                            {
                                user.auth && (
                                    <NavLink
                                        to="/write"
                                        style={({ isActive }) => {
                                            return {
                                                borderBottom: isActive ? "2px solid goldenRod" : "",
                                            };
                                        }}
                                        className="topListItem me-2"
                                    >
                                        <li>WRITE</li>
                                    </NavLink>
                                )
                                
                            }
                            {
                                userDetail?.role === "admin" && (
                                    <NavLink
                                        to="/admin"
                                        style={({ isActive }) => {
                                            return {
                                                borderBottom: isActive ? "2px solid goldenRod" : "",
                                            };
                                        }}
                                        className="topListItem ms-2"
                                    >
                                        <li>ADMIN</li>
                                    </NavLink>
                                )
                                
                            }
                            {!user.auth && (
                                <NavLink
                                    to="/register"
                                    className="topListItem me-0"
                                    style={({ isActive }) => {
                                        return {
                                            borderBottom: isActive ? "2px solid goldenRod" : "",
                                        };
                                    }}
                                >
                                    <li>REGISTER</li>
                                </NavLink>
                            )}
                        </Nav>
                    </div>

                    <div className="topRight d-flex align-items-center justify-content-md-end justify-content-sm-start">
                        {user.auth ? (
                            <>
                                <button
                                    onClick={() => logOut()}
                                    className=" navLogoutBtn me-3 border-0 "
                                >
                                    Logout
                                </button>
                                {data[0]?.img ? (
                                    <img className="topImg me-2" src={data[0]?.img} alt="" />
                                ) : (
                                    <i
                                        className=" fa-regular fa-user me-2"
                                        style={{ fontSize: "30px" }}
                                    ></i>
                                )}

                                <p className="mb-0">{data[0]?.name}</p>
                                <Dropdown className="dropDown">
                                    <Dropdown.Toggle
                                        className="dropDownBtn"
                                        variant=""
                                        id="dropdown-basic"
                                    ></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/profile/${data[0]?._id}`}>
                                            My Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/settings">
                                            Settings
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <NavLink
                                style={{ marginRight: "30px" }}
                                to="/login"
                                className="topListItem"
                            >
                                <button className="navLoginBtn  border-0">Login</button>
                            </NavLink>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavComponent;
