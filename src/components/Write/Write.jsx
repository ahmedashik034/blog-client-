import React, { useState } from 'react';
import './Write.css';
import JoditEditor from 'jodit-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useFetch from '../../hooks/useFetch';
import { useRef } from 'react';
import useFirebase from '../../hooks/useFirebase';
import Swal from 'sweetalert2';

const Write = () => {
    // const editor = useRef(null);
    const [content, setContent] = useState('');
    const { setDataLoading, postData } = useFetch();
    const titleRef = useRef();
    const categoryRef = useRef();
    const [imageUpload, setImageUpload] = useState("") || {};
    const { user } = useFirebase();

    const handleImage = async (e) => {
        setDataLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.set("key", "5ef8b75ebd5911a1ca073db6b222856d");
        formData.append("image", image);

        const imgUpload = await postData("https://api.imgbb.com/1/upload", formData);
        if (imgUpload.status === 200) {
            setDataLoading(false);
            setImageUpload(imgUpload.data.data.url);
            console.log(imageUpload);
        }
    };

    const config = {
        readonly: false,
        height: 350,
        placeholder: "Tell your story...",
    }

    const animatedComponents = makeAnimated();
    const options = [
        { label: 'Life', value: 'Life' },
        { label: 'Tech', value: 'Tech' },
        { label: 'Food', value: 'Food' },
        { label: 'Photography', value: 'Photography' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Movie', value: 'Movie' },
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = titleRef.current.value;
        const category = categoryRef?.current?.props?.value?.value;
        // console.log(category)
        let post = content;

        // console.log(post);
        const img = imageUpload;
        const blogData = {
            name, post, author: user?.displayName,
            email: user?.email, img, category
        };
        console.log(blogData);
        const blogUpload = await postData(
            "https://bloge-server.vercel.app/api/v1/blogs",
            blogData
        );
        titleRef.current.value = "";
        categoryRef.current.props.value.value = "";
        post = "";
        new Swal({
            title: "Hurray!",
            text: "Your blog is successfully uploaded :)",
            icon: "success",
        });
        console.log(blogUpload);
    };

    return (
        <div className='write pt-5 d-flex flex-column justify-content-center align-items-center'>

            {/* <img className='writeImg' src={imageUpload? imageUpload : postImg} alt="" /> */}
            {imageUpload &&
                <img className='writeImg' src={imageUpload} alt="" />}
            <form className='writeForm'>

                <div className="writeFormGroup d-flex align-items-center">

                    <label htmlFor="fileInput" class="" data-toggle="tooltip" data-placement="left" title="Add image for this blog">
                    <i className="writeIcon d-flex align-items-center justify-content-center fa-solid fa-plus"></i>
                    </label>

                    {/* <label htmlFor="fileInput">
                        <i className="writeIcon d-flex align-items-center justify-content-center fa-solid fa-plus"></i>
                    </label> */}
                    <input
                        onChange={handleImage}
                        accept="image/*"
                        type="file" name="file" id="fileInput" style={{ display: "none" }} />
                    <input type="text" ref={titleRef} className='writeInput p-4' placeholder='Title' autoFocus={true} />
                </div>

                <Select className='selectField w-25 ms-auto mb-3'
                    ref={categoryRef}
                    label="Category"
                    closeMenuOnSelect={true}
                    components={animatedComponents}

                    options={options}
                    placeholder="Category"
                />


                <div className="writeFormGroup">
                    {/* <textarea placeholder='Tell your story...' type="text" className='writeInput writeText p-4'></textarea> */}

                    <JoditEditor
                        // ref={editor}
                        // value={content}

                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    // onChange={(newContent) => {
                    // setContent(newContent);
                    // }}
                    />
                </div>
                <div className='d-flex justify-content-end publish-btn'>
                    <button onClick={handleSubmit} className="btn-lg btn-publish d-inline-flex align-items-center justify-content-center align-self-center border-0 px-4 py-3 mb-5">
                        <span>Publish</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Write;