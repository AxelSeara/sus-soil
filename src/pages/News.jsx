import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('all'); // Nuevo filtro para tipo de contenido

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
    <div>
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4 mt-16">Latest News & Events</h2>
        
        {/* Filtros para fecha y tipo */}
        <div className="mb-4">
          <input
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="p-2 border rounded mr-4"
          />
          <select onChange={handleTypeFilterChange} value={filterType} className="p-2 border rounded">
            <option value="all">All</option>
            <option value="news">News</option>
            <option value="events">Events</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mostrar noticias si están seleccionadas o todos los contenidos */}
          {(filterType === 'all' || filterType === 'news') && filteredPosts.map(post => (
            <div key={post.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{post.title.rendered}</h3>
              {post._embedded && post._embedded['wp:featuredmedia'] && (
                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-48 object-cover mb-2" />
              )}
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <a href={`/news/${post.id}`} className="text-blue-500 hover:underline mt-2 block">Read More</a>
            </div>
          ))}

          {/* Mostrar eventos si están seleccionados o todos los contenidos */}
          {(filterType === 'all' || filterType === 'events') && filteredEvents.map(event => (
            <div key={event.id} className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{event.acf.title}</h3>
              {event.acf.poster && event._embedded && event._embedded["wp:featuredmedia"] && (
                <img 
                  src={event._embedded["wp:featuredmedia"][0]?.source_url || ''} 
                  alt={event.acf.title} 
                  className="w-full h-48 object-cover mb-2" 
                />
              )}
              <p>{event.acf.description}</p>
              <p>{event.acf.date}</p>
              <p>{event.acf.location}</p>
              <a href={`/event/${event.id}`} className="bg-white text-green-500 hover:text-green-700 p-2 rounded mt-2 block text-center">See Event</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;