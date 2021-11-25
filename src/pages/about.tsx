import * as React from "react";
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';

type DataSiteType = {site: { siteMetadata: { title: string; siteUrl: string; context: { siteData: string }}}}

const AboutPage:React.FC<PageProps<DataSiteType>> = ({data: { site : { siteMetadata}}}) => {
    return (
        <Layout>
            <h1>About page</h1>
            <p>{siteMetadata.siteUrl}</p>
            <p>{siteMetadata.context.siteData}</p>
        </Layout>
    )
}
export default AboutPage;
export const query = graphql`
    query {
        site {
            siteMetadata {
                title
                siteUrl
                context {
                    siteData
                } 
            }
        }
    }
`;
