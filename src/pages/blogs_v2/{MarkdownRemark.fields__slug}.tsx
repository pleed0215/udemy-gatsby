import * as React from 'react';
import Layout from '../../components/layout';
import { graphql, PageProps } from 'gatsby';
import '../../styles/blog.scss';

type MarkdownType = {
    markdownRemark: {
        id: string;
        html: string;
        frontmatter: {
            title: string;
            date: string;
        };
    };
};

const BlogTemplate: React.FC<PageProps<MarkdownType, { slug: string }>> = ({
    data,
    pageContext: { slug },
}) => {
    console.log(data);
    return (
        <Layout>
            <h1>
                {data.markdownRemark.frontmatter.title} -{' '}
                <span>{data.markdownRemark.frontmatter.date}</span>
            </h1>
            <p>slug: {slug}</p>
            <div
                className={'blog-content'}
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
        </Layout>
    );
};

export default BlogTemplate;

export const query = graphql`
    query ($id: String) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
            }
        }
    }
`;
