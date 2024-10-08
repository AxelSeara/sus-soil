import React, { useEffect, useState } from 'react';

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts with embedded media
        const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3&_embed');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="bg-white py-8 px-4 md:px-12 shadow-lg rounded-lg my-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-green-500 border-2 border-transparent transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-2 text-black">{post.title.rendered}</h3>
            {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url && (
              <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered || 'Post image'} className="mb-2 rounded-lg" />
            )}
            <a href={`/news/${post.id}`} className="inline-block px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
              Read More
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/news" className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full shadow-lg transition-colors">Visit All News</a>
      </div>
    </section>
  );
};

export default News;