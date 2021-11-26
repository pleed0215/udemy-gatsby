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
        console.log(slug);
        createNodeField({
            node,
            name: 'slug',
            value: slug.replace(/\//g, ''),
        });
    }
};
