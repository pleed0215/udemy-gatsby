import * as React from 'react';
import { PageProps, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import BlogList from '../components/blog.list';
import SEO from '../components/seo';

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
type PageContext = {
    limit: number;
    skip: number;
    currentPage: number;
    numPages: number;
};

const BlogsPaginatedPage: React.FC<PageProps<MarkdownResultType, PageContext>> =
    ({ data, pageContext: { currentPage, numPages } }) => {
        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const nextPage = (currentPage + 1).toString();
        const prevPage =
            currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
        return (
            <Layout>
                <SEO
                    title={'Hello this is what...'}
                    description={'Description of what..?'}
                />
                <div className={'p-4'}>
                    <BlogList blogs={data.allMarkdownRemark.nodes} />
                </div>
                <div className={'is-center'}>
                    <Link
                        className={`button is-small is-center`}
                        to={`/blogs/${prevPage}`}
                        rel={'prev'}
                        // @ts-ignore
                        disabled={isFirst}
                    >
                        Prev
                    </Link>
                    <Link
                        className={`button is-small is-center`}
                        to={`/blogs/${nextPage}`}
                        rel={'next'}
                        // @ts-ignore
                        disabled={isLast}
                    >
                        Next
                    </Link>
                </div>
            </Layout>
        );
    };

export const query = graphql`
    query PaginatedQuery($limit: Int!, $skip: Int!) {
        allMarkdownRemark(
            limit: $limit
            skip: $skip
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

export default BlogsPaginatedPage;
