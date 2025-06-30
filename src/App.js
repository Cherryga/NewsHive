import React from 'react';
import NewsList from './components/NewsList';

const App = () => {
    return (
        <div className="App">
            <NewsList />
        </div>
    );
};

export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import NewsComponent from './components/NewsComponent';

// const API_KEY = 'ee20272ed00648978955d20fec43d6d8';

// const App = () => {
//   const [articles, setArticles] = useState([]);
//   const [category, setCategory] = useState('general');
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const observer = useRef();

//   // Fetch news
//   const fetchNews = async (reset = false) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=10&page=${page}&apiKey=${API_KEY}`);
//       const data = await res.json();
//       if (data.articles) {
//         setArticles(prev => reset ? data.articles : [...prev, ...data.articles]);
//       } else {
//         console.error('NewsAPI error:', data);
//       }
//     } catch (err) {
//       console.error('Error fetching articles:', err);
//     }
//     setLoading(false);
//   };

//   // Trigger on mount & category change
//   useEffect(() => {
//     setArticles([]);
//     setPage(1);
//     fetchNews(true);
//   }, [category]);

//   // Trigger on page scroll
//   useEffect(() => {
//     if (page > 1) fetchNews();
//   }, [page]);

//   // Infinite scroll observer
//   const lastArticleRef = useRef();
//   useEffect(() => {
//     const handleObserver = (entries) => {
//       if (entries[0].isIntersecting && !loading) {
//         setPage(prev => prev + 1);
//       }
//     };

//     observer.current = new IntersectionObserver(handleObserver);
//     if (lastArticleRef.current) {
//       observer.current.observe(lastArticleRef.current);
//     }

//     return () => {
//       if (lastArticleRef.current) {
//         observer.current.unobserve(lastArticleRef.current);
//       }
//     };
//   }, [articles, loading]);

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>📰 India News</h1>

//       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//         {['general', 'sports', 'entertainment', 'technology', 'business', 'health'].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             style={{
//               margin: '0 10px',
//               padding: '10px 20px',
//               background: category === cat ? '#6c5ce7' : '#dfe6e9',
//               color: category === cat ? 'white' : 'black',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer'
//             }}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {articles.map((article, i) => (
//         <div key={i} ref={i === articles.length - 1 ? lastArticleRef : null}>
//           <NewsComponent article={article} />
//         </div>
//       ))}

//       {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
//     </div>
//   );
// };

// export default App;
