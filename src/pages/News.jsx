import React, { useEffect, useState } from 'react';

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/posts?_embed');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/event?_embed');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchPosts();
    fetchEvents();
  }, []);

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredPosts = posts.filter(post => post.date.includes(filterDate));
  const filteredEvents = events.filter(event => event.date.includes(filterDate));

  return (
    <div className="bg-lightGreen min-h-screen">
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 mt-16 text-center text-brown font-serif">Latest News & Events</h2>

        {/* Filtros para fecha y tipo */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
          <input
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="p-3 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <select
            onChange={handleTypeFilterChange}
            value={filterType}
            className="p-3 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option value="all">All</option>
            <option value="news">News</option>
            <option value="events">Events</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filterType === 'all' || filterType === 'news') && filteredPosts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-brown font-serif">{post.title.rendered}</h3>
              {post._embedded && post._embedded['wp:featuredmedia'] && (
                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-48 object-cover mb-4 rounded-lg" />
              )}
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} className="text-brown mb-4" />
              <a href={`/news/${post.id}`} className="bg-brown text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors block text-center">Read More</a>
            </div>
          ))}

          {(filterType === 'all' || filterType === 'events') && filteredEvents.map(event => (
            <div key={event.id} className="bg-green-500 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 font-serif">{event.acf.title}</h3>
              {event.acf.poster && event._embedded && event._embedded["wp:featuredmedia"] && (
                <img 
                  src={event._embedded["wp:featuredmedia"][0]?.source_url || ''} 
                  alt={event.acf.title} 
                  className="w-full h-48 object-cover mb-4 rounded-lg" 
                />
              )}
              <p className="mb-2">{event.acf.description}</p>
              <p className="mb-2">Date: {event.acf.date}</p>
              <p className="mb-4">Location: {event.acf.location}</p>
              <a href={`/event/${event.id}`} className="bg-white text-green-500 px-6 py-2 rounded-full hover:text-green-700 transition-colors block text-center">See Event</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
