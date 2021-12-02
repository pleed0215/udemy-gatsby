import * as React from 'react';
import Blog from './blog';

export default function BlogList({ blogs, search: SearchBox, searchIndex }) {
    return (
        <>
            {SearchBox && (
                <div className={'mb-4'}>
                    <SearchBox searchIndex={searchIndex} />
                </div>
            )}
            <div className="columns is-multiline">
                {blogs.map((blog) => (
                    <div key={blog.id} className={'column is-9'}>
                        <Blog blog={blog} />
                    </div>
                ))}
            </div>
        </>
    );
}
