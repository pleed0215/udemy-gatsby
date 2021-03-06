import * as React from 'react';
import { Link } from 'gatsby';

const style = {
    time: {
        fontSize: '12px',
    },
};

export default function Blog({ blog }) {
    const { title, subtitle, date } = blog.frontmatter;
    const { slug } = blog.fields;

    return (
        <div className="content is-normal">
            <div className="head-wrapper mb-2">
                <h2 className="mb-0">{title}</h2>
                <time style={style.time} dateTime={style.time.fontSize}>
                    {date}
                </time>
            </div>
            <p>{subtitle}</p>
            <Link
                className="button is-link is-light is-small"
                to={`/blogs_v2/${slug}`}
            >
                Continue reading
            </Link>
        </div>
    );
}
