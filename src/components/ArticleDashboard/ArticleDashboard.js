import React, {useState, useEffect} from 'react';
import ArticleAPI from '../ApiClient/Article';
import MaterialTable from 'material-table';
import './ArticleDashboard.css';

const ArticleDashboard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        ArticleAPI.getArticleSnapshots()
        .then(data => {
            setArticles(data);
        })
    }, []);

    const editPost = (evt, data) => {
        window.location.href = "/updateArticle?id="+data[0]._id;
    };

    return(
        <div className = "main-view-dashboard">
            <MaterialTable
                title="Badlav Articles"
                columns={[
                    { title: 'Name', field: 'personName' },
                    { title: 'Title', field: 'title' },
                    { title: 'Date', field: 'date'}
                ]}
                data={articles}        
                options={{
                    selection: true
                }}
                actions={[
                {
                    tooltip: 'Edit Post',
                    icon: 'edit',
                    onClick: (evt, data) => editPost(evt, data)
                }
                ]}
            />
        </div>
    )
};

export default ArticleDashboard;