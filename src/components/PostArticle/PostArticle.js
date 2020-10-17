import React, {useState} from 'react';
import {Card, TextField, Button, makeStyles} from '@material-ui/core';
import '../Utility.css';
import './PostArticle.css';
import ArticleAPI from  '../ApiClient/Article';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValid()){
            const article = {
                personName,
                title,
                content,
                social:socialHandle,
                description: content.substring(0, 250),
                image,
                date: moment(new Date()).format("MMM DD, YYYY")
            }
            ArticleAPI.postArticle(article)
            .then(data => {
                toast.success('Article posted successfully!');
            });
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
        setPersonName("");
        document.querySelector('#name').value = "";
        setTitle("");
        document.querySelector('#article-title').value = "";
        setContent("");
        document.querySelector('#article-content').value = "";
        setSocialHandle("");
        document.querySelector('#article-sm').value = "";
    }

    return(
        <div className = "main-wrapper flexBox">
            <Card className = "article-card flexBox">
                <form noValidate autoComplete="off" className = "article-form">
                    <TextField
                        required
                        id="name"
                        className = {classes.field}
                        label="Name"
                        defaultValue = ""
                        placeholder="Name here!"
                        variant="outlined"
                        onChange = {(e) => setPersonName(e.target.value)}
                    />
                    <TextField
                        required
                        id="article-title"
                        className = {classes.field}
                        label="Title"
                        defaultValue = ""
                        placeholder="Title here!"
                        variant="outlined"
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                    <ReactQuill 
                        theme="snow" 
                        value={content} 
                        onChange={setContent}
                        id = "article-content"
                        className = "content-box"    
                    />
                    <TextField
                        required
                        id="article-image"
                        className = {classes.field}
                        label="Image URL"
                        defaultValue = ""
                        placeholder="Image URL here!"
                        variant="outlined"
                        onChange = {(e) => setImage(e.target.value)}
                    />
                    <TextField
                        id="article-sm"
                        className = {classes.field}
                        label="Social"
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
                        Send
                    </Button>
                </form>
            </Card>
            <ToastContainer/>
        </div>
    )
}

export default PostArticle;