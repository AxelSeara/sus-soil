import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const NewsDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://admin.sus-soil.eu/wp-json/wp/v2/posts/${id}?_embed`);
                const postData = await response.json();
                setPost(postData);
                fetchRecentPosts();
                window.scrollTo(0, 0);  // Scrolls to the top of the page when the component loads
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchRecentPosts = async () => {
            const response = await fetch('https://admin.sus-soil.eu/wp-json/wp/v2/posts?per_page=3&order=desc&orderby=date&_embed');
            const data = await response.json();
            setRecentPosts(data);
        };

        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <section className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-4 mt-16">{post.title.rendered}</h1>
                {post._embedded?.['wp:featuredmedia']?.[0] && (
                    <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full" />
                )}
                <div className="mt-4">
                    <p className="text-gray-600">Published on {new Date(post.date).toLocaleDateString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    <div className="flex gap-2 mt-4">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share on Facebook</a>
                        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title.rendered}`} className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Share on Twitter</a>
                        <a href={`mailto:?subject=${post.title.rendered}&body=Check out this post! ${window.location.href}`} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Share via Email</a>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">Recent News</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recentPosts.map((recentPost) => (
                        <Link key={recentPost.id} to={`/news/${recentPost.id}`} className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-semibold">{recentPost.title.rendered}</h3>
                            {recentPost._embedded?.['wp:featuredmedia']?.[0] ? (
                                <img src={recentPost._embedded['wp:featuredmedia'][0].source_url} alt={recentPost.title.rendered} className="w-full h-48 object-cover mb-2" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 mb-2" /> // Placeholder if no image is available
                            )}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NewsDetail;