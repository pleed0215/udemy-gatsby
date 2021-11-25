import * as React from 'react';
import { PageProps, graphql, Link } from 'gatsby';
import Layout from '../components/layout';

type MarkdownResultType = {
    allMarkdownRemark: {
        totalCount: number;
        nodes: Array<{
            id: string;
            frontmatter: {
                title?: string;
                subtitle?: string;
                date?: string;
            };
            excerpt: string;
            fields: {
                slug: string;
            };
        }>;
    };
};

const MarkdownPage: React.FC<PageProps<MarkdownResultType>> = ({ data }) => {
    return (
        <Layout>
            <h4>{data.allMarkdownRemark.totalCount} posts</h4>
            <ul>
                {data.allMarkdownRemark.nodes.map((node) => (
                    <li key={node.id}>
                        <h3>
                            {node.frontmatter.title}
                            <span> - {node.frontmatter.date}</span>
                        </h3>
                        <p>{node.excerpt}</p>
                        <Link to={node.fields.slug}>Read more &rarr;</Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export const query = graphql`
    query {
        allMarkdownRemark {
            totalCount
            nodes {
                id
                frontmatter {
                    title
                    subtitle
                    date(formatString: "YYYY-MM-DD")
                }
                excerpt
                fields {
                    slug
                }
            }
        }
    }
`;

export default MarkdownPage;
