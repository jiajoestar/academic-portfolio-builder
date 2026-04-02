import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const search = async (q) => {
        setQuery(q)

        if (!q) {
            setResults([]);
            return
        }

        const res = await axios.get(
            `http://localhost:5000/api/users/search?q=${q}`
        )

        setResults(res.data)
    }

    return (
        <div>
            <input
                placeholder='Search for an academic'
                onChange={(e) => search(e.target.value)}
            />

            {results.length === 0 ? (
                <p>No results</p>
            ) : (
                results.map(u => (
                    <div key={u._id}>{u.name}</div>
                ))
            )}
        </div>
    )
}

export default Search