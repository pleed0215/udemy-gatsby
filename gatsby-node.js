const axios = require('axios');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const result = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
    `);
    const {
        data: {
            allMarkdownRemark: { nodes },
        },
    } = result;

    const postsPerPage = 2;
    const numPages = Math.ceil(nodes.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, index) => {
        createPage({
            path: index === 0 ? `/blogs` : `/blogs/${index + 1}`,
            component: require.resolve('./src/templates/blogs.paginated.tsx'),
            context: {
                limit: postsPerPage,
                skip: index * postsPerPage,
                numPages,
                currentPage: index + 1,
            },
        });
    });

    nodes.forEach((node) => {
        createPage({
            path: `/blogs/${node.fields.slug}`,
            component: require.resolve('./src/templates/blogs.tsx'),
            context: {
                slug: node.fields.slug,
            },
        });
    });
};

exports.onCreateNode = ({
    node,
    getNode,
    actions: { createNode, createNodeField },
}) => {
    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({ node, getNode, basePath: 'blogs' });
        createNodeField({
            node,
            name: 'slug',
            value: slug.replace(/\//g, ''),
        });
    }
};
