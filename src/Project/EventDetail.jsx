// EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCamera,
  FaShareAlt,
  FaCalendarPlus,
} from 'react-icons/fa';

// Ícono X para Twitter
const XIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.3,2.3L12,10l7.7-7.7c0.4-0.4,1-0.4,1.4,0l1.3,1.3c0.4,0.4,0.4,1,0,1.4L14,12l7.7,7.7
      c0.4,0.4,0.4,1,0,1.4l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0L12,14l-7.7,7.7c-0.4,0.4-1,0.4-1.4,0L1.6,20.3
      c-0.4-0.4-0.4-1,0-1.4L9.3,12L1.6,4.3c-0.4-0.4-0.4-1,0-1.4l1.3-1.3C3.3,1.9,3.9,1.9,4.3,2.3z" />
  </svg>
);

// Helper: format date for Google Calendar (full day).
const formatDateForCalendar = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '00000000';
  const year = d.getUTCFullYear();
  const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
  const day = (`0${d.getUTCDate()}`).slice(-2);
  return `${year}${month}${day}`;
};

// Helper: generate a slug from title + date (YYYY-MM-DD).
const generateSlug = (title, date) => {
  let datePart = 'unknown-date';
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    datePart = d.toISOString().slice(0, 10); // YYYY-MM-DD
  }
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slugifiedTitle}-${datePart}`;
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  // For newsletter form
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');

  // OS-based share
  const handleNativeShare = async () => {
    if (navigator.share && event) {
      try {
        await navigator.share({
          title: event.acf?.title || 'Event',
          text: `Check out this event: ${event.acf?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing failed', error);
      }
    } else {
      console.log('Web Share API not supported in this browser.');
    }
  };

  // Fetch the event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/event/${id}?_embed`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoadingEvent(false);
        window.scrollTo(0, 0);
      }
    };
    fetchEvent();
  }, [id]);

  // Once the event is loaded, update URL with slug
  useEffect(() => {
    if (event) {
      const titleText = event.acf?.title || event.title?.rendered || 'no-title';
      const eventDate = event.acf?.date || event.date;
      const slug = generateSlug(titleText, eventDate);
      const expectedPath = `/event/${event.id}-${slug}`;
      if (window.location.pathname !== expectedPath) {
        navigate(expectedPath, { replace: true });
      }
    }
  }, [event, navigate]);

  if (loadingEvent) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Basic skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-red-500">Event not found</h2>
      </div>
    );
  }

  // Extract event data
  const title = event.acf?.title || event.title?.rendered || 'No Title';
  const imageUrl = event._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const date = event.acf?.date || event.date;
  const location = event.acf?.location || '';
  const description = event.acf?.description || '';

  // Calendar link
  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatDateForCalendar(date)}/${formatDateForCalendar(date)}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:grid md:grid-cols-4 md:gap-8">
        {/* LEFT COLUMN (1/4): date, Add to Calendar, share */}
        <div className="md:col-span-1 flex flex-col space-y-6 mt-16">
          {/* Date */}
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Date:</span>{' '}
            {new Date(date).toLocaleDateString()}
          </div>

          {/* Add to Calendar */}
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
          >
            <FaCalendarPlus />
            <span>Add to Calendar</span>
          </a>

          {/* Share Button (OS-based) */}
          <button
            onClick={handleNativeShare}
            className="bg-brown text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2"
          >
            <span>Share</span>
            <FaShareAlt />
          </button>
        </div>

        {/* CENTER COLUMN (2/4): Title, location, image, description */}
        <div className="md:col-span-2">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-brown mb-4 mt-16">
            {title}
          </h1>

          {/* Location (below title) */}
          {location && (
            <p className="text-brown text-sm mb-2">
              <span className="font-semibold">Location:</span> {location}
            </p>
          )}

          {/* Main Image */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto max-h-[600px] object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xl">Here flyer image</span>
            </div>
          )}

          {/* Description */}
          <div
            className="text-brown leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        {/* RIGHT COLUMN (1/4): Google Maps, newsletter, back button */}
        <div className="md:col-span-1 flex flex-col space-y-6 mt- md:mt-0">
          {/* Google Maps */}
          {location && (
            <div>
              <h2 className="text-xl font-bold font-serif text-brown mb-2">
                Event Location
              </h2>
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Event Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
                  allowFullScreen
                  className="w-full h-64"
                ></iframe>
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="border-t pt-4 text-center">
            <h2 className="text-xl font-bold font-serif text-brown mb-2">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Join our newsletter to receive the latest updates on upcoming events.
            </p>
            <form
              className="flex flex-col space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                // Placeholder subscription logic
                setNewsletterSuccess('Subscribed successfully!');
                setTimeout(() => setNewsletterSuccess(''), 3000);
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 text-sm"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Subscribe Now
              </button>
            </form>
            {newsletterSuccess && (
              <p className="mt-2 text-green-600 text-sm">{newsletterSuccess}</p>
            )}
          </div>

          {/* Back to events/news */}
          <div className="text-center mt-auto">
            <Link
              to="/news"
              className="inline-block bg-brown text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors font-serif"
            >
              Back to Events & News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}