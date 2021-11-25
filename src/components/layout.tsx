import * as React from 'react';
import Header from './header';

const Layout: React.FC = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};
export default Layout;
