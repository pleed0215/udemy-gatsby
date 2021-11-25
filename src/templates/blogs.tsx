import * as React from 'react';
import Layout from '../components/layout';
import { graphql, useStaticQuery, PageProps } from 'gatsby';

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
    return (
        <Layout>
            <h1>
                {data.markdownRemark.frontmatter.title} -{' '}
                <span>{data.markdownRemark.frontmatter.date}</span>
            </h1>
            <p>slug: {slug}</p>
            <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
        </Layout>
    );
};

export default BlogTemplate;

export const query = graphql`
    query ($slug: String) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
            }
        }
    }
`;
