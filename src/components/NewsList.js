import React, { useEffect, useState } from 'react';
import NewsComponent from './NewsComponent';


const NewsList = () => {
    const [articles, setArticles] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:8081/news');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setArticles(data.articles); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {articles.length > 0 ? (
                articles.map((article, index) => (
                    <NewsComponent key={index} article={article} />
                ))
            ) : (
                <p>No news articles available.</p>
            )}
        </div>
    );
};

export default NewsList;
