import * as React from 'react';
import Layout from '../components/layout';
import { graphql, PageProps } from 'gatsby';
import '../styles/blog.scss';
import SEO from '../components/seo';

type MarkdownType = {
    markdownRemark: {
        id: string;
        html: string;
        frontmatter: {
            title: string;
            subtitle: string;
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
            <SEO
                title={data.markdownRemark.frontmatter.title}
                description={data.markdownRemark.frontmatter.subtitle}
            />
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
    query ($slug: String) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                subtitle
                date(formatString: "YYYY-MM-DD")
            }
        }
    }
`;
