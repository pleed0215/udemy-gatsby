const axios = require('axios');
exports.createPages = async ({ actions: { createPage } }) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = res.data;

    posts.forEach(post => createPage({
        path: `/posts/${post.id}`,
        component: require.resolve('./src/templates/post.tsx'),
        context: { post },
    }));

    createPage({
        path: '/posts',
        component: require.resolve('./src/templates/posts.tsx'),
        context: { posts },
    });
};

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = res.data;

    posts.forEach(post => {
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
                type: "Post",
                // for hash or short digital summary of this node.
                contentDigest: createContentDigest(post),
                // content exposing raw content of this node.
                content: JSON.stringify(post)
            }
        }
        actions.createNode(node);
    });
}
