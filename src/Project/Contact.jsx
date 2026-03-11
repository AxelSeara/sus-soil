import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiClock, FiMail, FiMessageCircle, FiSend, FiUser } from 'react-icons/fi';
import { sectionReveal } from '../lib/motion';

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').toLowerCase());

const socialChannels = [
  { href: 'https://www.facebook.com/SUSSOIL/', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://x.com/SUSSOIL', label: 'X', Icon: FaXTwitter },
  { href: 'https://www.linkedin.com/company/sus-soil', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://www.youtube.com/@sus-soil', label: 'YouTube', Icon: FaYoutube },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (touched.name && formData.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (touched.email && !isEmail(formData.email)) e.email = 'Please enter a valid email address.';
    if (touched.subject && formData.subject.trim().length < 4) e.subject = 'Please provide a short subject.';
    if (touched.message && formData.message.trim().length < 20) {
      e.message = 'Please provide at least 20 characters.';
    }
    return e;
  }, [formData, touched]);

  const isValid =
    formData.name.trim().length >= 2 &&
    isEmail(formData.email) &&
    formData.subject.trim().length >= 4 &&
    formData.message.trim().length >= 20 &&
    !formData.website;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;

    setSubmitting(true);
    const subject = encodeURIComponent(`SUS-SOIL contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:mrosa.mosquera.losada@usc.es?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setTouched({});
    }, 320);
  };

  const messageCount = formData.message.length;
  const messageLimit = 1200;

  return (
    <section className="px-4 py-14 md:py-16 bg-gradient-to-b from-white via-[#f6fcf7] to-[#edf8f1]">
      <div className="max-w-screen-xl mx-auto">
        <motion.header
          className="max-w-3xl mb-8 md:mb-10"
          variants={sectionReveal}
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-brown mb-4">
            Contact the SUS-SOIL Team
          </h1>
          <p className="text-base md:text-lg text-brown/90 leading-relaxed">
            For project enquiries, collaboration opportunities, or dissemination requests, please
            use the form below. Your default email application will open with your message draft.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-6 md:gap-8 items-start">
          <motion.aside
            className="card-elevated border border-darkGreen/10 bg-white/90 backdrop-blur p-6 md:p-7"
            variants={sectionReveal}
            initial={false}
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Contact information"
          >
            <h2 className="text-2xl font-serif font-semibold text-brown mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-darkGreen/10 bg-lightGreen/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-darkGreen mb-1">
                  General Enquiries
                </p>
                <a
                  href="mailto:mrosa.mosquera.losada@usc.es"
                  className="inline-flex items-center gap-2 text-brown font-semibold hover:text-darkGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
                >
                  <FiMail aria-hidden="true" />
                  mrosa.mosquera.losada@usc.es
                </a>
              </div>

              <div className="rounded-xl border border-darkGreen/10 bg-white p-4">
                <p className="inline-flex items-center gap-2 text-sm text-brown/90">
                  <FiClock aria-hidden="true" className="text-darkGreen" />
                  Typical response time: 2-5 working days
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-brown mb-3">Official channels</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5">
                  {socialChannels.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-darkGreen/10 bg-white px-3 py-2 text-sm font-medium text-brown hover:bg-lightGreen/25 hover:text-darkGreen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkGreen focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs text-brown/70 leading-relaxed">
              Information submitted through this form is used only to respond to your enquiry.
              Form submissions are not stored on this website.
            </p>
          </motion.aside>

          <motion.form
            onSubmit={handleSubmit}
            className="card-elevated border border-darkGreen/10 bg-white/95 backdrop-blur p-6 md:p-8"
            variants={sectionReveal}
            initial={false}
            whileInView="visible"
            viewport={{ once: true }}
            noValidate
            aria-label="Contact form"
          >
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-brown">Send a Message</h2>
                <p className="text-sm text-brown/75 mt-1">
                  All fields are required unless otherwise indicated.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-lightGreen/20 px-3 py-1 text-xs font-semibold text-darkGreen">
                <FiSend aria-hidden="true" />
                Email draft flow
              </span>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Full name
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
                    className={`w-full p-3 pl-10 rounded-lg text-gray-900 border focus:ring-2 focus:ring-darkGreen ${
                      errors.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                  />
                </div>
                {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email address
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
                    className={`w-full p-3 pl-10 rounded-lg text-gray-900 border focus:ring-2 focus:ring-darkGreen ${
                      errors.email ? 'border-red-400' : 'border-gray-300'
                    }`}
                    placeholder="name@example.com"
                    autoComplete="email"
                    inputMode="email"
                    required
                  />
                </div>
                {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full p-3 rounded-lg text-gray-900 border focus:ring-2 focus:ring-darkGreen ${
                  errors.subject ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Example: Collaboration request"
                required
              />
              {errors.subject ? <p className="mt-1 text-sm text-red-600">{errors.subject}</p> : null}
            </div>

            <div className="mb-5">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                Message
              </label>
              <div className="relative">
                <FiMessageCircle className="absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`w-full p-3 pl-10 rounded-lg text-gray-900 border focus:ring-2 focus:ring-darkGreen ${
                    errors.message ? 'border-red-400' : 'border-gray-300'
                  }`}
                  rows="6"
                  placeholder="Please include relevant context so we can route your enquiry efficiently."
                  minLength={20}
                  maxLength={messageLimit}
                  required
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs">
                {errors.message ? (
                  <span className="text-red-600">{errors.message}</span>
                ) : (
                  <span className="text-gray-500">Minimum 20 characters</span>
                )}
                <span className="text-gray-500">
                  {messageCount}/{messageLimit}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || submitting}
              className={`w-full rounded-lg py-3.5 font-semibold text-base transition-colors focus:ring-2 focus:ring-darkGreen ${
                !isValid || submitting
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-darkGreen text-white hover:bg-green-800'
              }`}
              aria-busy={submitting}
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Preparing message...
                </span>
              ) : (
                'Prepare Email Message'
              )}
            </button>

            <p className="mt-4 min-h-[1.5rem] text-center text-sm font-medium text-green-700" aria-live="polite">
              {submitted ? 'Your email draft has been prepared successfully.' : ''}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
