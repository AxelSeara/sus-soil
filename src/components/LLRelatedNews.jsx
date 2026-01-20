import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";

const stripHtml = (html = "") => (html ? html.replace(/<[^>]+>/g, "") : "");
const shorten = (txt = "", n = 140) =>
  txt.length > n ? txt.slice(0, n).trimEnd() + "…" : txt;

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4 min-h-[22rem] border border-gray-100">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-40 bg-gray-100 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function LLRelatedNews({
  // ✅ usa slug (ej: "ll-galicia") — esto es lo que tú tienes ahora en LivingLabDetail
  llTagSlug,
  // opcional: si algún día prefieres pasar el ID directamente
  llTagId,
  perPage = 100,
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRelated = async () => {
      try {
        setLoading(true);
        setPosts([]);

        // 1) Determinar el tagId
        let tagId = llTagId || null;

        if (!tagId) {
          if (!llTagSlug) {
            setLoading(false);
            return;
          }

          // Endpoint: resolver tag por slug
          const tagUrl = `https://admin.sus-soil.eu/wp-json/wp/v2/tags?slug=${encodeURIComponent(
            llTagSlug
          )}&_=${Date.now()}`;

          const tagRes = await fetch(tagUrl, {
            cache: "no-cache",
            signal: controller.signal,
          });
          if (!tagRes.ok) throw new Error("Error fetching tag ID");

          const tagData = await tagRes.json();
          tagId = Array.isArray(tagData) && tagData[0]?.id ? tagData[0].id : null;

          // Si no existe el tag, no mostramos nada
          if (!tagId) {
            setLoading(false);
            return;
          }
        }

        // 2) Buscar posts con ese tag ID
        const postsUrl = `https://admin.sus-soil.eu/wp-json/wp/v2/posts?tags=${tagId}&_embed&per_page=${perPage}&_=${Date.now()}`;

        const res = await fetch(postsUrl, {
          cache: "no-cache",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Error fetching related posts");

        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];

        setPosts(arr.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (e) {
        if (e?.name !== "AbortError") {
          console.error("Error fetching related posts", e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();

    return () => controller.abort();
  }, [llTagSlug, llTagId, perPage]);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-12 px-6 md:px-16 mt-10 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-brown text-3xl w-10 h-10 rounded-full bg-lightGreen/20 grid place-items-center">
          <FaNewspaper />
        </span>
        <h2 className="text-3xl md:text-4xl font-medium font-serif text-brown">
          Related News & Events
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {posts.map((post) => {
            const titleHtml = post.title?.rendered || "Untitled";
            const titleText = stripHtml(titleHtml);
            const dateObj = new Date(post.date);
            const dateFormatted = dateObj.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            const imgUrl =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            const excerptText = shorten(
              stripHtml(post.excerpt?.rendered || ""),
              140
            );

            return (
              <motion.article
                key={post.id}
                variants={cardVariants}
                className="relative group cursor-pointer bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col min-h-[23rem] overflow-hidden"
              >
                <a
                  href={`/news/${post.id}`}
                  className="absolute inset-0 z-10 rounded-xl"
                  aria-label={`Read more: ${titleText}`}
                />

                <h3 className="text-xl font-serif mb-2 text-brown font-semibold leading-tight">
                  <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
                </h3>

                <p className="text-xs text-gray-500 mb-3">
                  <time dateTime={dateObj.toISOString()}>{dateFormatted}</time>
                </p>

                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt=""
                    className="mb-4 rounded-lg object-cover w-full h-40 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                    <span className="text-gray-500 text-xs">No image</span>
                  </div>
                )}

                <p className="text-sm text-gray-700 leading-relaxed">
                  {excerptText}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}