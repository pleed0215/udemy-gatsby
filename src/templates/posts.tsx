import * as React from "react";
import Layout from '../components/layout';
import {Link} from "gatsby"


const Posts = ({pageContext: { posts }}) => {
    return <Layout>
        <h1>This is posting...</h1>
        <ul>
            {posts.map(p => <li key={p.id}>
               <Link to={`${p.id}`}>{p.title}</Link>
            </li>)
            }
        </ul>
    </Layout>
}


export default Posts;
