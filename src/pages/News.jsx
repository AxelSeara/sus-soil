import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'; // Ensure you have a Footer component

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filterDate, setFilterDate] = useState('');

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

    fetchPosts();
  }, []);

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredPosts = posts.filter(post => post.date.includes(filterDate));

  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4">Latest News</h2>
        <input
          type="date"
          value={filterDate}
          onChange={handleFilterChange}
          className="mb-4 p-2 border rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{post.title.rendered}</h3>
              {post._embedded && post._embedded['wp:featuredmedia'] && (
                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-48 object-cover mb-2" />
              )}
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <a href={post.link} className="text-blue-500 hover:underline mt-2 block">Read More</a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsPage;