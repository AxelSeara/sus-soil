// src/components/News.js
import React, { useEffect, useState } from 'react';

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{post.title.rendered}</h3>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <a href={post.link} className="text-blue-500 hover:underline mt-2 block">
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;