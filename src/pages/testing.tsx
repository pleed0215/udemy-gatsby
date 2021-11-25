import * as React from "react";
import Layout from '../components/layout';
import {Link, graphql} from "gatsby"


const TestingPage = ({data}) => {
    return <Layout>
        <h1>This is posting...</h1>
        <ul>
            {data.allPost.edges.map(p => <li key={p.node.id}>
                <Link to={`${p.node.id}`}>{p.node.title}</Link>
            </li>)
            }
        </ul>
    </Layout>
}


export default TestingPage;

export const query = graphql`
    query AllPost {
        allPost {
           edges {
               node {
                   id
                   title
                   body
               }
           }
        }
    }
`;
