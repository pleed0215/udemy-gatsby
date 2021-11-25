const axios = require('axios')
exports.createPages = async ({ actions: { createPage } }) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = res.data;

    posts.forEach( post => createPage({
        path: `/posts/${post.id}`,
        component: require.resolve('./src/templates/post.tsx'),
        context: { post }
    }));

    createPage({
        path: '/posts',
        component: require.resolve('./src/templates/posts.tsx'),
        context: { posts },
    })
};

exports.createSchemaCustomization = ({actions}) => {
    const {createTypes} = actions;
    const typeDefs = `
        type PostJson {
            id: ID!
            title: String!
            body: String!
            isActive: Boolean!
            wordCount: Int,
            tags: [String!]!
            content: Content
        }
        type Content {
            text: String!
            title: String!
        }
    `;
    createTypes(typeDefs);
}
exports.createResolvers = ({createResolvers}) => {
    const resolvers = {
        Query: {
            allPost: {
                type: ["PostJson"],
                resolve() {
                    console.log("Hitting the query!");
                    return [{
                        id: 101,
                        title: "Hello, world",
                        body: "My custom text",
                        isActive: true,
                        wordCount: 100,
                        tags: ["fuck"],
                        content: {
                            text: "This is content text",
                            title: "This is content title",
                        }
                    }, {
                        id: 102,
                        title: "Hello world 2",
                        body: "My custom text2",
                        isActive: false,
                        tags: []
                    }]
                }
            }
        }
    }
    createResolvers(resolvers);
}
