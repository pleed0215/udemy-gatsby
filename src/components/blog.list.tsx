import * as React from 'react';
import Blog from './blog';

export default function BlogList({ blogs }) {

    return (
        <div className='columns is-multiline'>
            {blogs.map(blog => <div key={blog.id} className={'column is-9'}><Blog blog={blog} /></div>)}
        </div>
    );
}
