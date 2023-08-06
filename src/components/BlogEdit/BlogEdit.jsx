import React, { useState, useEffect, useRef } from "react";
import "./BlogEdit.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import Swal from "sweetalert2";
import axios from "axios";

const BlogEdit = () => {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data, getData, setDataLoading, patchData, postData } = useFetch();
    const { postId } = useParams();
    const titleRef = useRef(null);
    const categoryRef = useRef(null);
    const imageInputRef = useRef(null);
    const { user } = useFirebase();

    useEffect(() => {
      console.log("Getting data...");
      getData(
        `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`
      );
    }, []);

    useEffect(() => {
      if (data && data.length) {
        // setContent(data[0].post);
        setSelectedCategory({
          label: data[0].category,
          value: data[0].category,
        });
      }
    }, [data]);

    const handleImageUpload = async e => {
      if (!e) {
        return;
      }

      console.log(e);
      setDataLoading(true);
      const image = e;
      const formData = new FormData();
      formData.set("key", "5ef8b75ebd5911a1ca073db6b222856d");
      formData.append("image", image);

      try {
        const response = await postData(
          "https://api.imgbb.com/1/upload",
          formData
        );
        if (response.status === 200) {
          setDataLoading(false);
          setImageUrl(response.data.data.url);
        }
        console.log(response);
        console.log(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };

    const handleFormSubmit = async e => {
      e.preventDefault();
      const title = titleRef.current.value;
      const category = selectedCategory.value;
      const post = content;
      const imageFile = imageInputRef.current?.files?.[0];
      // const imageUrl = imageFile ? await handleImageUpload(imageFile) : data[0]?.img;
      console.log(imageUrl);
      const blogData = {
        name: title,
        post,
        author: user?.displayName,
        email: user?.email,
        img: imageUrl,
        category,
      };
      console.log(blogData);
      try {
        const response = await axios.patch(
          `https://bloge-server.vercel.app/api/v1/blogs?_id=${postId}`,
          blogData
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Hurray!",
            text: "Your blog is successfully updated :)",
            icon: "success",
          });
          titleRef.current.value = "";
          setContent("");
          setSelectedCategory(null);
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "There was an error updating your blog. Please try again later.",
          icon: "error",
        });
      }
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    const animatedComponents = makeAnimated();
    const options = [
        { label: "Life", value: "Life" },
        { label: "Tech", value: "Tech" },
        { label: "Food", value: "Food" },
        { label: "Photography", value: "Photography" },
        { label: "Sports", value: "Sports" },
        { label: "Movie", value: "Movie" },
    ];
    return (
        <div className="blog-edit-container">
            <h2>Edit Blog Post</h2>
            {data && data.length && (
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            defaultValue={data[0].name}
                            ref={titleRef}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <Select
                            className="category-select"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            defaultValue={{ label: data[0].category, value: data[0].category }}
                            isSearchable={true}
                            name="category"
                            options={options}
                            onChange={handleCategoryChange}
                            ref={categoryRef}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="image"
                            ref={imageInputRef}
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data[0]?.post}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Blog
                    </button>
                </form>
            )}
        </div>
    );
};

export default BlogEdit;
