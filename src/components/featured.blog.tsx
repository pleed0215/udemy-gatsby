import * as React from 'react';
import { Link } from 'gatsby';

const style = {
    time: {
        fontSize: '12px',
    },
};

export default function FeaturedBlog({ blog }) {
    const { title, subtitle, date, author } = blog.frontmatter;
    const { slug } = blog.fields;

    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{title}</p>
                        <p className="subtitle is-6">{author ?? 'Anonymous'}</p>
                    </div>
                </div>
                <div className="content mb-1">
                    {subtitle}
                    <br />
                    <time style={style.time} dateTime={style.time.fontSize}>
                        {date}
                    </time>
                </div>
                <Link
                    to={`/blogs_v2/${slug}`}
                    className="button is-light is-link is-small"
                >
                    Continue reading
                </Link>
            </div>
        </div>
    );
}
