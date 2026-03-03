// EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  FaShareAlt,
  FaCalendarPlus,
} from 'react-icons/fa';
import { HeroSectionSkeleton } from '../components/Skeletons';
import SEO from '../components/SEO';
import { getFeaturedMedia, getWpImageProps } from '../lib/imageSeo';

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
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const numericId = String(routeId || '').split('-')[0];

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
      } catch {
        // User cancelled share or platform failed silently.
      }
    }
  };

  // Fetch the event
  useEffect(() => {
    if (!numericId) {
      setEvent(null);
      setLoadingEvent(false);
      return;
    }

    const controller = new AbortController();
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        const response = await fetch(
          `https://admin.sus-soil.eu/wp-json/wp/v2/event/${numericId}?_embed`,
          { signal: controller.signal }
        );
        if (response.status === 404) {
          setEvent(null);
          return;
        }
        if (!response.ok) {
          throw new Error(`Error fetching event: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('Error fetching event:', error);
          setEvent(null);
        }
      } finally {
        setLoadingEvent(false);
        window.scrollTo(0, 0);
      }
    };
    fetchEvent();
    return () => controller.abort();
  }, [numericId]);

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
    return <HeroSectionSkeleton />;
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
  const eventImageProps = getWpImageProps(getFeaturedMedia(event), {
    altFallback: title,
    sizes: '(max-width: 1024px) 100vw, 60vw',
    loading: 'eager',
    fetchPriority: 'high',
  });
  const imageUrl = eventImageProps?.src || null;
  const date = event.acf?.date || event.date;
  const eventLocation = event.acf?.location || '';
  const description = event.acf?.description || '';
  const plainDescription = description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const canonical = `${window.location.origin}${routerLocation.pathname}`;
  const eventStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    startDate: date,
    endDate: date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: eventLocation
      ? {
          '@type': 'Place',
          name: eventLocation,
          address: eventLocation,
        }
      : undefined,
    image: imageUrl || undefined,
    description: plainDescription || `SUS-SOIL event: ${title}`,
    organizer: {
      '@type': 'Organization',
      name: 'SUS-SOIL',
      url: 'https://sus-soil.eu',
    },
    url: canonical,
  };

  // Calendar link
  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatDateForCalendar(date)}/${formatDateForCalendar(date)}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(eventLocation)}`;

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={`${title} | SUS-SOIL Event`}
        description={plainDescription || `Details about the SUS-SOIL event: ${title}`}
        canonicalUrl={canonical}
        image={imageUrl || '/logo.webp'}
        type="article"
        keywords="SUS-SOIL event, soil conference, agroecology event, sustainable soil management"
        structuredData={eventStructuredData}
      />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:grid lg:grid-cols-4 lg:gap-8">
        {/* LEFT COLUMN (1/4): date, Add to Calendar, share */}
        <div className="order-2 lg:order-1 lg:col-span-1 flex flex-col space-y-6 mt-8 lg:mt-16">
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
        <div className="order-1 lg:order-2 lg:col-span-2">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-brown mb-4 mt-2 lg:mt-16">
            {title}
          </h1>

          {/* Location (below title) */}
          {eventLocation && (
            <p className="text-brown text-sm mb-2">
              <span className="font-semibold">Location:</span> {eventLocation}
            </p>
          )}

          {/* Main Image */}
          {imageUrl ? (
            <img
              {...eventImageProps}
              className="w-full h-auto max-h-[600px] object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-56 sm:h-72 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xl">Here flyer image</span>
            </div>
          )}

          {/* Description */}
          <div
            className="text-brown leading-relaxed"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
          ></div>
        </div>

        {/* RIGHT COLUMN (1/4): Google Maps, newsletter, back button */}
        <div className="order-3 lg:order-3 lg:col-span-1 flex flex-col space-y-6 mt-8 lg:mt-0">
          {/* Google Maps */}
          {eventLocation && (
            <div>
              <h2 className="text-xl font-bold font-serif text-brown mb-2">
                Event Location
              </h2>
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Event Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(eventLocation)}&output=embed`}
                  allowFullScreen
                  className="w-full h-56 sm:h-64"
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
