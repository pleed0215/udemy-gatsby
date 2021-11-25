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

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
        type PostJson {
            id: ID!
            title: String!
            body: String!
        }
        
        input TitleFilter {
            eq: String
            in: String
        }
        
    `;
    createTypes(typeDefs);
};
exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        Query: {
            allPost: {
                type: ['PostJson'],
                args: {
                    filter: `input PostFilterInput { title: TitleFilter }`,
                    limit: 'Int',
                },
                async resolve(source, args, context, info) {
                    const { filter } = args;
                    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');

                    if (filter) {
                        if(filter.title) {
                            if(filter.title.eq) {
                                return data.filter( d => d.title === filter.title.eq);
                            }else if(filter.title.in) {
                                return data.filter( d => d.title.includes(filter.title.in));
                            }
                        }

                    }
                    return data;
                },
            },
        },
    };
    createResolvers(resolvers);
};
