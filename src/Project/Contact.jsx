import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiUser, FiMail, FiMessageCircle } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

// Animaciones
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const isEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').toLowerCase());

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' }); // website = honeypot
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (touched.name && formData.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (touched.email && !isEmail(formData.email)) e.email = 'Enter a valid email address.';
    if (touched.message && formData.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters.';
    return e;
  }, [formData, touched]);

  const isValid =
    formData.name.trim().length >= 2 &&
    isEmail(formData.email) &&
    formData.message.trim().length >= 10 &&
    !formData.website; // honeypot vacío

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) return;

    setSubmitting(true);
    const subject = encodeURIComponent('Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );

    // mailto
    window.location.href = `mailto:mrosa.mosquera.losada@usc.es?subject=${subject}&body=${body}`;

    // feedback UI
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', website: '' });
      setTouched({});
    }, 300);
  };

  const messageCount = formData.message.length;
  const messageLimit = 1000;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-lightGreen to-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Columna izquierda: texto + redes */}
        <motion.div
          className="text-center lg:text-left"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-brown mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-brown/90 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            If you have any questions, feel free to contact us at{' '}
            <a
              href="mailto:mrosa.mosquera.losada@usc.es"
              className="text-darkGreen underline decoration-transparent hover:decoration-darkGreen transition"
            >
              mrosa.mosquera.losada@usc.es
            </a>
            . You can also find us on social media:
          </p>

          {/* Social cards */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto lg:mx-0">
            {[
              {
                href: 'https://www.facebook.com/SUSSOIL/',
                label: 'Facebook',
                Icon: FaFacebookF,
              },
              {
                href: 'https://x.com/SUSSOIL',
                label: 'Twitter (X)',
                Icon: FaXTwitter,
              },
              {
                href: 'https://www.linkedin.com/company/sus-soil',
                label: 'LinkedIn',
                Icon: FaLinkedinIn,
              },
              {
                href: 'https://www.youtube.com/@sus-soil',
                label: 'YouTube',
                Icon: FaYoutube,
              },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md transition
                           text-brown hover:text-darkGreen focus:outline-none focus-visible:ring-2 ring-offset-2 flex items-center justify-center"
                title={label}
              >
                <Icon className="text-2xl" />
              </a>
            ))}
          </div>

          {/* Nota privacidad */}
          <p className="mt-6 text-sm text-brown/70 max-w-xl mx-auto lg:mx-0">
            By contacting us you agree that we may use the information you provide to respond to
            your inquiry. We do not store form submissions on this site; your email client will
            send the message.
          </p>
        </motion.div>

        {/* Columna derecha: formulario */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur p-6 md:p-8 rounded-2xl shadow-md ring-1 ring-black/5 w-full"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          noValidate
        >
          {/* Honeypot (invisible para humanos) */}
          <div className="hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              value={formData.website}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Nombre */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Your Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full p-3 pl-10 rounded-lg text-gray-900 focus:ring-2 focus:ring-darkGreen border
                 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                placeholder="John Doe"
                required
                minLength={2}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full p-3 pl-10 rounded-lg text-gray-900 focus:ring-2 focus:ring-darkGreen border
                 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                placeholder="name@example.com"
                required
                autoComplete="email"
                inputMode="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
              Your Message
            </label>
            <div className="relative">
              <FiMessageCircle className="absolute left-3 top-3.5 text-gray-400" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full p-3 pl-10 rounded-lg text-gray-900 focus:ring-2 focus:ring-darkGreen border
                 ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
                rows="5"
                placeholder="Write your message here..."
                required
                minLength={10}
                maxLength={1000}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              {errors.message ? (
                <span className="text-red-600">{errors.message}</span>
              ) : (
                <span className="text-gray-500">Minimum 10 characters</span>
              )}
              <span className="text-gray-500">{messageCount}/{messageLimit}</span>
            </div>
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={!isValid || submitting}
            className={`w-full py-3 rounded-lg font-bold text-lg transition-colors focus:ring-2 focus:ring-darkGreen
              ${!isValid || submitting
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-darkGreen text-white hover:bg-green-800'}`}
            aria-busy={submitting}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Sending…
              </span>
            ) : (
              'Submit'
            )}
          </button>

          {/* Mensaje éxito accesible */}
          <p className="text-center mt-4 text-green-700 font-semibold min-h-[1.5rem]" aria-live="polite">
            {submitted ? 'Your message has been prepared in your email client.' : ''}
          </p>
        </motion.form>
      </div>
    </section>
  );
}