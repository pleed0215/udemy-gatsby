import React, { useState } from 'react';
import * as JsSearch from 'js-search';
import * as styles from './searchContainer.module.scss';
import { Link } from 'gatsby';

export default function SearchContainer({ searchIndex }) {
    const [search, setSearch] = useState({
        results: [],
        engine: {},
        query: '',
    });

    const rebuildIndex = React.useCallback(() => {
        if (searchIndex) {
            const searchEngine = new JsSearch.Search('slug');
            searchEngine.sanitizer = new JsSearch.LowerCaseSanitizer();
            searchEngine.indexStrategy = new JsSearch.PrefixIndexStrategy();
            // Tf - Term Frequency
            // Idf - Inverse Document Frequency
            searchEngine.searchIndex = new JsSearch.TfIdfSearchIndex('slug');
            searchEngine.addIndex('title');
            searchEngine.addIndex('subtitle');
            searchEngine.addDocuments(searchIndex.blogs);
            setSearch({
                results: [],
                query: '',
                engine: searchEngine,
            });
        }
    }, [searchIndex]);

    React.useEffect(() => {
        rebuildIndex();
    }, [rebuildIndex]);

    const onChangeText = ({ target: { value } }) => {
        if (search.engine) {
            setSearch({
                ...search,
                results: search.engine.search(value),
                query: value,
            });
        }
    };

    return (
        <div>
            <input
                onChange={onChangeText}
                value={search.query}
                style={{ width: '200px' }}
                className="input"
                type="text"
                placeholder="Search"
            />
            {search.results.length > 0 && (
                <div className={`${styles.options} select is-multiple`}>
                    <ul>
                        {search.results.map((result) => (
                            <Link
                                to={`/blogs_v2/${result.slug}`}
                                key={result.slug}
                            >
                                <li
                                    role="presentation"
                                    className={`${styles.option} p-2`}
                                >
                                    <p className={`${styles.title}`}>
                                        {result.title}
                                    </p>
                                    <p className={`${styles.subtitle}`}>
                                        {result.subtitle}
                                    </p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
