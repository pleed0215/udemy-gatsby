import * as React from "react";
import Layout from '../components/layout';
import {Link, graphql} from "gatsby"


const TestingPage = ({data}) => {
    return <Layout>
        <h1>This is posting...</h1>
        <ul>
            {data.allPost.map(p => <li key={p.id}>
                <Link to={`${p.id}`}>{p.title}</Link>
            </li>)
            }
        </ul>
    </Layout>
}


export default TestingPage;

export const query = graphql`
    query AllPost {
        allPost {
            id
            title
            body
        } 
    }
`;
