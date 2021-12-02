import * as React from 'react';
import { PageProps, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import FeaturedBlog from '../components/featured.blog';
import BlogList from '../components/blog.list';
import SearchContainer from '../components/search.container';

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

const MarkdownPage: React.FC<
    PageProps<MarkdownResultType, { searchIndex: any }>
> = ({ data, pageContext: { searchIndex } }) => {
    return (
        <Layout>
            <div className={'columns'}>
                {data.allMarkdownRemark.nodes.slice(0, 2).map((node) => (
                    <div className={'column'} key={node.id}>
                        <FeaturedBlog blog={node} />
                    </div>
                ))}
            </div>
            <div className={'p-4'}>
                <BlogList
                    blogs={data.allMarkdownRemark.nodes}
                    search={SearchContainer}
                    searchIndex={searchIndex}
                />
            </div>
        </Layout>
    );
};

export const query = graphql`
    query {
        allMarkdownRemark(
            sort: {
                order: [DESC, DESC]
                fields: [frontmatter___date, frontmatter___rating]
            }
        ) {
            totalCount
            nodes {
                id
                frontmatter {
                    title
                    subtitle
                    date(formatString: "YYYY-MM-DD")
                    author
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
