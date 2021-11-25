import * as React from "react";
import Layout from '../components/layout';


const Post = ({pageContext: { post }}) => {
    return <Layout>
        <h1>This is post detail</h1>
        <p>id: {post.id}</p>
        <p>title: {post.title}</p>
        <p>body: {post.body}</p>
    </Layout>
}


export default Post;
