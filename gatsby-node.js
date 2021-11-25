const axios = require('axios');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = res.data;

    posts.forEach((post) =>
        createPage({
            path: `/posts/${post.id}`,
            component: require.resolve('./src/templates/post.tsx'),
            context: { post },
        }),
    );

    createPage({
        path: '/posts',
        component: require.resolve('./src/templates/posts.tsx'),
        context: { posts },
    });

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
            path: node.fields.slug,
            component: require.resolve('./src/templates/blogs.tsx'),
            context: {
                slug: node.fields.slug,
            },
        });
    });
};

exports.sourceNodes = async ({
    actions,
    createNodeId,
    createContentDigest,
}) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = res.data;

    posts.forEach((post) => {
        const node = {
            title: post.title,
            body: post.body,
            // node id must be globally unique
            id: createNodeId(`Post-${post.id}`),
            // ID to the parent node.
            parent: null,
            // IDs to the children nodes.
            children: [],
            // internal field are not usually interesting for consumers
            // but are very important for Gatsby Core.
            internal: {
                // globally unique node type
                type: 'Post',
                // for hash or short digital summary of this node.
                contentDigest: createContentDigest(post),
                // content exposing raw content of this node.
                content: JSON.stringify(post),
            },
        };
        actions.createNode(node);
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
            value: slug,
        });
    }
};
