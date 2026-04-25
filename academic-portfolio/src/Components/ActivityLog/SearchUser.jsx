import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../ActivityLog/Navbar';
import './SearchUser.css'
import PublicNavbar from '../Home/PublicNavbar';

const SearchUser = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const isLoggedIn = !!localStorage.getItem('token')

    const searchUsers = async (q) => {
        const value = q.trim()
        setQuery(q)
        setError('')

        if (!value) {
            setResults([])
            setSearched(false)
            return
        }

        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/search?q=${encodeURIComponent(value)}`)
            setResults(res.data)
            setSearched(true)
        } catch (err) {
            console.error(err)
            setError('Something went wrong while searching.')
            setResults([])
            setSearched(true)
        } finally {
            setLoading(false)
        }
    }

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const initialQuery = searchParams.get('q') || ''
        if (initialQuery) {
            searchUsers(initialQuery)
        }
    }, [searchParams])

    return (
        <div className='search-page'>
            {isLoggedIn ? <Navbar /> : <PublicNavbar />}

            <div className='search-page-content'>
                <div className='search-card'>
                    <h1>Find academics</h1>
                    <p>Search for registered users and explore their public profiles.</p>

                    <div className='search-input-wrapper'>
                        <input
                            type='text'
                            value={query}
                            placeholder='Search for an academic'
                            onChange={(e) => searchUsers(e.target.value)}
                            className='search-page-input'
                        />
                    </div>

                    {loading && <p className='search-status'>Searching...</p>}
                    {error && <p className='search-status error'>{error}</p>}

                    {!loading && searched && results.length === 0 && (
                        <p className='search-status'>No results found.</p>
                    )}

                    <div className='search-results'>
                        {results.map((u) => (
                            <Link
                                key={u._id}
                                to={`/users/${u._id}`}
                                className='search-result-card'
                            >
                                <img
                                    src={u.avatar || 'https://via.placeholder.com/70'}
                                    alt={u.name}
                                    className='search-result-avatar'
                                />

                                <div className='search-result-info'>
                                    <h3>{u.name}</h3>
                                    <p>{u.headline || 'No headline added yet.'}</p>
                                    <span>{u.workplace || 'No workplace added yet.'}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchUser