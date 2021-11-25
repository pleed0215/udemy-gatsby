module.exports = {
    siteMetadata: {
        siteUrl: 'https://www.yourdomain.tld',
        title: 'udemy-gatsby',
        context: {
            siteData: "fuck you"
        }
    },

    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        'gatsby-plugin-sass',
    ],
};
