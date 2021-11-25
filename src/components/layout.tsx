import * as React from 'react';
import AppHeader from './header';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <main className={"container is-max-desktop"}>
                <AppHeader seo={''}/>
                {children}
            </main>
            <Footer />
        </>
    );
};
export default Layout;
