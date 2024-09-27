import React, { useEffect, useState } from 'react';

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3');
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
          <div key={post.id} className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-2">{post.title.rendered}</h3>
            <div className="text-gray-600 text-sm"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <a href={post.link} className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;