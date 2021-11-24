exports.createPages = ({ actions: { createPage } }) => {
    createPage({
        path: '/posts',
        component: require.resolve('./src/templates/posts.tsx'),
        context: { testingData: 'This is testing data' },
    });
};
