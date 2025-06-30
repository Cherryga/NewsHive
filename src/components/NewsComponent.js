import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './NewsComponent.css';

const NewsComponent = ({
  article,
  cardWidth = '80%',
  theme = 'light',
  showSource = true,
  showDate = true,
  showAuthor = true,
  enableScrollEffects = true,
  enableBookmark = true,
  enableShare = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sentiment, setSentiment] = useState('neutral');
  const [categories, setCategories] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const cardRef = useRef(null);
  const shareRef = useRef(null);

  useEffect(() => {
    if (!enableScrollEffects) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => cardRef.current && observer.unobserve(cardRef.current);
  }, [enableScrollEffects]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const desc = (article.description || '').toLowerCase();
    if (desc.includes('win') || desc.includes('growth')) setSentiment('positive');
    else if (desc.includes('loss') || desc.includes('crash')) setSentiment('negative');
    else setSentiment('neutral');
  }, [article.description]);

  useEffect(() => {
    const text = `${article.title} ${article.description}`.toLowerCase();
    const tags = [];
    if (text.includes('politics')) tags.push('Politics');
    if (text.includes('sports') || text.includes('match')) tags.push('Sports');
    if (text.includes('technology') || text.includes('tech')) tags.push('Technology');
    if (text.includes('health')) tags.push('Health');
    if (text.includes('finance') || text.includes('market')) tags.push('Finance');
    if (tags.length === 0) tags.push('General');
    setCategories(tags);
  }, [article.title, article.description]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    if (!isBookmarked) {
      localStorage.setItem('newsBookmarks', JSON.stringify([...bookmarks, article]));
    } else {
      localStorage.setItem(
        'newsBookmarks',
        JSON.stringify(bookmarks.filter(b => b.url !== article.url))
      );
    }
    setIsBookmarked(!isBookmarked);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(`${article.title}. ${article.description || ''}`);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const toggleTheme = () => setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));

const translateArticle = () => {
  const translateUrl = `https://translate.google.com/translate?sl=auto&tl=hi&u=${encodeURIComponent(article.url)}`;
  window.open(translateUrl, '_blank');
};


  const shareArticle = (method) => {
    const shareData = { title: article.title, text: article.description || '', url: article.url };
    try {
      if (method === 'native' && navigator.share) {
        navigator.share(shareData);
      } else if (method === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(article.url)}`);
      } else if (method === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(article.url)}`);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
    setShowShareOptions(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const calculateReadingTime = (text) => {
    if (!text) return '1 min read';
    const wordsPerMinute = 200;
    const minutes = Math.ceil(text.split(/\s+/).length / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div
      ref={cardRef}
      className={`news-card ${currentTheme} ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{ width: cardWidth }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {article.urlToImage && (
        <div className="image-container">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.width = '0';
            }}
          />
          <div className="image-overlay"></div>
        </div>
      )}

      <div className="content">
        <div className="header-row">
          <h2 className="title">{article.title}</h2>
          <div className="action-buttons">
            {enableBookmark && (
              <button className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`} onClick={toggleBookmark}>
                <i className="fas fa-bookmark"></i>
              </button>
            )}
            <button onClick={toggleTheme} className="theme-btn">
              <i className="fas fa-adjust"></i>
            </button>
            <button onClick={translateArticle} className="translate-btn">
              <i className="fas fa-language"></i>
            </button>
            <button className={`speak-btn ${isSpeaking ? 'active' : ''}`} onClick={toggleSpeech}>
              <i className={`fas ${isSpeaking ? 'fa-stop' : 'fa-volume-up'}`}></i>
            </button>
            {enableShare && (
              <div className="share-container" ref={shareRef}>
                <button className="share-btn" onClick={() => setShowShareOptions(!showShareOptions)}>
                  <i className="fas fa-share-alt"></i>
                </button>
                {showShareOptions && (
                  <div className="share-options">
                    {navigator.share && <button onClick={() => shareArticle('native')}><i className="fas fa-mobile-alt"></i> Share</button>}
                    <button onClick={() => shareArticle('twitter')}><i className="fab fa-twitter"></i> Twitter</button>
                    <button onClick={() => shareArticle('facebook')}><i className="fab fa-facebook"></i> Facebook</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="meta">
          {showSource && article.source?.name && <span className="source"><i className="fas fa-newspaper"></i> {article.source.name}</span>}
          {showDate && article.publishedAt && <span className="date"><i className="far fa-calendar-alt"></i> {formatDate(article.publishedAt)}</span>}
          {showAuthor && article.author && <span className="author"><i className="fas fa-user-edit"></i> {article.author}</span>}
          <span className="reading-time"><i className="far fa-clock"></i> {calculateReadingTime(article.description)}</span>
        </div>

        <div className="tags">
          {categories.map((cat, idx) => (
            <span key={idx} className={`tag tag-${cat.toLowerCase()}`}>{cat}</span>
          ))}
          <span className={`sentiment sentiment-${sentiment}`}>Sentiment: {sentiment}</span>
        </div>

        <p className="description">{article.description || 'No description available.'}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read Full Article <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

NewsComponent.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
    source: PropTypes.shape({ name: PropTypes.string }),
    author: PropTypes.string
  }).isRequired,
  cardWidth: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  showSource: PropTypes.bool,
  showDate: PropTypes.bool,
  showAuthor: PropTypes.bool,
  enableScrollEffects: PropTypes.bool,
  enableBookmark: PropTypes.bool,
  enableShare: PropTypes.bool
};

export default NewsComponent;
