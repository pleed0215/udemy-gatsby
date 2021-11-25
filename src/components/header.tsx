import * as React from 'react';
import { Link } from 'gatsby';
import './header.scss';

const Header = () => {
    return (
        <div className={'.header-container'}>
            <h1 className={'header-title'}>I am header~! fuck.</h1>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/about'}>About</Link>
                </li>
                <li>
                    <Link to={'/posts'}>Posts</Link>
                </li>
            </ul>
        </div>
    );
};
export default Header;
