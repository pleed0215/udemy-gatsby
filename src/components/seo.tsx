import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
export default function SEO({ title, description, meta = [] }) {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);

    const defaultTitle = title
        ? `${title} | ${site.siteMetadata?.title}`
        : site.siteMetadata?.title ?? '';
    const defaultDescription = description || site.siteMetadata?.description;

    // TODO: add og:url
    return (
        <Helmet
            htmlAttributes={{
                lang: 'en',
            }}
            title={defaultTitle}
            meta={[
                {
                    name: 'description',
                    content: defaultDescription,
                },
                {
                    name: 'og:title',
                    content: defaultTitle,
                },
                {
                    name: 'og:description',
                    content: defaultDescription,
                },
                {
                    name: 'og:type',
                    content: 'website',
                },
                {
                    name: 'og:image',
                    content:
                        'https://import.cdn.thinkific.com/335268/courses/1498921/fRohgKGAQtOjls98pPbQ_Ethereum_Final.png',
                },
                {
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    name: 'twitter:creator',
                    content: 'Forking space',
                },
                {
                    name: 'twitter:title',
                    content: defaultTitle,
                },
                {
                    name: 'twitter:description',
                    content: defaultDescription,
                },
            ].concat(meta)}
        />
    );
}
