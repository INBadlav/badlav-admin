import React, {useState, useEffect} from 'react';
import {Card, TextField, Button, makeStyles} from '@material-ui/core';
import '../Utility.css';
import './UpdateArticle.css';
import ArticleAPI from  '../ApiClient/Article';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import queryString from 'query-string';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const styles = makeStyles({
    field: {
        width: '100%',
        marginBottom: '20px'
    }
});

const PostArticle = () => {

    const classes = styles();
    const [personName, setPersonName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [socialHandle, setSocialHandle] = useState("");
    const [image, setImage] = useState("");
    const [article, setArticle] = useState({});

    useEffect(()=> {
        const articleId = queryString.parse(window.location.search).id;
        if(!articleId){
            window.location.href = "/";
        }else{
            ArticleAPI.getArticle(articleId)
            .then(data => {
                if(data.length > 0){
                    setContent(data[0].content);
                    setPersonName(data[0].personName);
                    document.querySelector('#name').value = data[0].personName;
                    setImage(data[0].image);
                    document.querySelector('#article-image').value = data[0].image;
                    setSocialHandle(data[0].social);
                    document.querySelector('#article-sm').value = data[0].social;
                    setTitle(data[0].title);
                    document.querySelector('#article-title').value = data[0].title;
                    setArticle(data[0]);
                    document.querySelector(".ql-editor").innerHTML = data[0].content;
                }else{
                    window.location.href = "/"; 
                }
            });
        }
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValid()){
            const articleObject = {
                id: article._id,
                personName,
                title,
                content,
                social:socialHandle,
                description: content.substring(0, 250),
                image,
                date: moment(new Date()).format("MMM DD, YYYY")
            }
            ArticleAPI.updateArticle(articleObject)
            .then(data => {
                toast.success('Article updated successfully!');
                window.location.href = "/"; 
            })
            .catch(err => {
                toast.error('There was an error updating article. Please try again later!');
            })
        }
        clearState();
    }

    const isValid = () => {
        if(!personName){
            toast.error("Please enter name");
        }
        if(!title){
            toast.error("Please enter title");
        }
        if(!content){
            toast.error("Please enter content");
        }
        return (personName && title && content);
    }

    const clearState = () => {
        setArticle({});
        setPersonName("");
        setImage("");
        document.querySelector('#article-image').value = "";
        document.querySelector('#name').value = "";
        setTitle("");
        document.querySelector('#article-title').value = "";
        setContent("");
        document.querySelector('#article-content').value = "";
        document.querySelector(".ql-editor").innerHTML = "";
        setSocialHandle("");
        document.querySelector('#article-sm').value = "";
    }

    return(
        <div className = "main-wrapper flexBox">
            {article?
            <Card className = "article-card flexBox">
                <form noValidate autoComplete="off" className = "article-form">
                    <TextField
                        required
                        id="name"
                        className = {classes.field}
                        defaultValue = ""
                        placeholder="Name here!"
                        helperText="Name"
                        variant="outlined"
                        onChange = {(e) => setPersonName(e.target.value)}
                    />
                    <TextField
                        required
                        id="article-title"
                        className = {classes.field}
                        helperText="Title"
                        defaultValue = ""
                        placeholder="Title here!"
                        variant="outlined"
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                    <ReactQuill 
                        theme="snow"
                        defaultValue={content} 
                        onChange={setContent}
                        id = "article-content"
                        className = "content-box"    
                    />
                    <TextField
                        required
                        id="article-image"
                        className = {classes.field}
                        helperText="Image URL"
                        defaultValue = ""
                        placeholder="Image URL here!"
                        variant="outlined"
                        onChange = {(e) => setImage(e.target.value)}
                    />
                    <TextField
                        id="article-sm"
                        className = {classes.field}
                        helperText="Social"
                        defaultValue = ""
                        placeholder="Social handle here!"
                        variant="outlined"
                        onChange = {(e) => setSocialHandle(e.target.value)}
                    />
                    <br/><br/>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick = {(e) => handleSubmit(e)}
                    >
                        Update
                    </Button>
                </form>
            </Card>
            
            :null}
            
            <ToastContainer/>
        </div>
    )
}

export default PostArticle;