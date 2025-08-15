import { createSignal, createEffect, For, Show, onMount } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Blogs() {
  const navigate = useNavigate();
  const [articles, setArticles] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal("");

  let sectionRef, titleRef, articleRefs = [];

  createEffect(() => {
    loadArticles();
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/list-blogs");
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data);
      } else {
        setError("Failed to load articles");
      }
    } catch (err) {
      setError("Failed to load articles");
      console.error("Error loading articles:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to blog post
  const navigateToBlog = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Set initial states
      gsap.set([titleRef], { opacity: 0, y: 30 });
      gsap.set(articleRefs, { opacity: 0, y: 50, scale: 0.95 });

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: sectionRef,
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

          // Animate title
          tl.to(titleRef, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          // Animate articles
          tl.to(
            articleRefs,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
            },
            "-=0.2"
          );
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  });

  return (
    <section
      ref={(el) => (sectionRef = el)}
      class="min-h-screen py-32 bg-white"
    >
      <div class="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div class="text-center mb-16">
          <h1 
            ref={(el) => (titleRef = el)}
            class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-quicksand"
          >
            My <span class="text-primary">Blog</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about development, technology, and building things that matter.
          </p>
        </div>

        <Show when={loading()}>
          <div class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </Show>

        <Show when={error()}>
          <div class="text-center py-20">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Articles</h3>
              <p class="text-red-600">{error()}</p>
              <button
                onClick={loadArticles}
                class="mt-4 btn btn-dark text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </Show>

        <Show when={!loading() && !error() && articles().length === 0}>
          <div class="text-center py-20">
            <div class="max-w-md mx-auto">
              <h3 class="text-2xl font-medium text-gray-900 mb-4">No Articles Yet</h3>
              <p class="text-gray-600 mb-6">
                I'm working on some great content. Check back soon!
              </p>
              <a href="/" class="btn btn-dark">
                Back to Home
              </a>
            </div>
          </div>
        </Show>

        <Show when={!loading() && !error() && articles().length > 0}>
          {/* Articles Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={articles()}>
              {(article, index) => (
                <article
                  ref={(el) => (articleRefs[index()] = el)}
                  class="group cursor-pointer"
                  onClick={() => navigateToBlog(article.slug)}
                >
                  <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200 overflow-hidden">
                    {/* Cover Image */}
                    <Show when={article.cover_image}>
                      <div class="aspect-video overflow-hidden">
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.parentElement.style.display = 'none';
                          }}
                        />
                      </div>
                    </Show>

                    <div class="p-6">
                      {/* Tags */}
                      <Show when={article.tags && article.tags.length > 0}>
                        <div class="flex flex-wrap gap-2 mb-3">
                          <For each={article.tags.slice(0, 3)}>
                            {(tag) => (
                              <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                {tag}
                              </span>
                            )}
                          </For>
                        </div>
                      </Show>

                      {/* Title */}
                      <h2 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <Show when={article.excerpt}>
                        <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      </Show>

                      {/* Date */}
                      <div class="flex items-center justify-between text-xs text-gray-500">
                        <time dateTime={article.published_at}>
                          {formatDate(article.published_at)}
                        </time>
                        <span class="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )}
            </For>
          </div>

          {/* Footer CTA */}
          <div class="text-center mt-16 pt-12 border-t border-gray-200">
            <h3 class="text-2xl font-medium text-gray-900 mb-4">Want to stay updated?</h3>
            <p class="text-gray-600 mb-6 max-w-md mx-auto">
              Follow me on social media for the latest updates and tech insights.
            </p>
            <div class="flex justify-center space-x-4">
              <a
                href="https://github.com/7azemaamer"
                target="_blank"
                class="btn btn-light text-sm"
              >
                GitHub
              </a>
              <a
                href="https://x.com/zicoaamer"
                target="_blank"
                class="btn btn-light text-sm"
              >
                Twitter
              </a>
              <a
                href="#contact_sec"
                class="btn btn-dark text-sm"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </Show>
      </div>
    </section>
  );
}

export function BlogPost() {
  const params = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal("");
  const [allArticles, setAllArticles] = createSignal([]);

  let contentRef, titleRef;

  createEffect(() => {
    loadArticle();
    loadAllArticles();
  });

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/list-blogs");
      const data = await response.json();
      
      if (data.success) {
        const foundArticle = data.data.find(article => article.slug === params.slug);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError("Article not found");
        }
      } else {
        setError("Failed to load article");
      }
    } catch (err) {
      setError("Failed to load article");
      console.error("Error loading article:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadAllArticles = async () => {
    try {
      const response = await fetch("/api/list-blogs");
      const data = await response.json();
      if (data.success) {
        setAllArticles(data.data.slice(0, 3)); 
      }
    } catch (err) {
      console.error("Error loading articles:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Convert content to HTML (basic markdown-like conversion)
  const formatContent = (content) => {
    if (!content) return "";
    
    return content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>');
  };

  onMount(() => {
    if (contentRef && titleRef) {
      gsap.fromTo([titleRef, contentRef], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }
  });

  return (
    <div class="min-h-screen py-32 bg-white">
      <div class="max-w-4xl mx-auto px-6">
        <Show when={loading()}>
          <div class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </Show>

        <Show when={error()}>
          <div class="text-center py-20">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 class="text-lg font-medium text-red-800 mb-2">Error</h3>
              <p class="text-red-600 mb-4">{error()}</p>
              <button
                onClick={() => navigate("/blogs")}
                class="btn btn-dark text-sm"
              >
                Back to Blogs
              </button>
            </div>
          </div>
        </Show>

        <Show when={!loading() && !error() && article()}>
          <article>
            {/* Header */}
            <header class="mb-12">
              <button
                onClick={() => navigate("/blogs")}
                class="text-gray-600 hover:text-gray-900 mb-6 inline-flex items-center transition-colors"
              >
                ← Back to Blogs
              </button>

              <div ref={(el) => (titleRef = el)}>
                <Show when={article().tags && article().tags.length > 0}>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <For each={article().tags}>
                      {(tag) => (
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </Show>

                <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {article().title}
                </h1>

                <Show when={article().excerpt}>
                  <p class="text-xl text-gray-600 mb-6 leading-relaxed">
                    {article().excerpt}
                  </p>
                </Show>

                <time 
                  dateTime={article().published_at}
                  class="text-gray-500 text-sm"
                >
                  Published on {formatDate(article().published_at)}
                </time>
              </div>
            </header>

            {/* Cover Image */}
            <Show when={article().cover_image}>
              <div class="mb-12 rounded-xl overflow-hidden">
                <img
                  src={article().cover_image}
                  alt={article().title}
                  class="w-full h-auto"
                />
              </div>
            </Show>

            {/* Content */}
            <div 
              ref={(el) => (contentRef = el)}
              class="prose prose-lg max-w-none"
            >
              <div 
                innerHTML={`<p>${formatContent(article().content)}</p>`}
                class="text-gray-800 leading-relaxed text-lg space-y-6"
              />
            </div>

            {/* Footer */}
            <footer class="mt-16 pt-12 border-t border-gray-200">
              <div class="text-center">
                <h3 class="text-2xl font-medium text-gray-900 mb-4">Thanks for reading!</h3>
                <p class="text-gray-600 mb-6">
                  Have questions or feedback? I'd love to hear from you.
                </p>
                <div class="flex justify-center space-x-4">
                  <a href="https://x.com/zicoaamer" target="_blank" class="btn btn-light text-sm">
                    Share on Twitter
                  </a>
                  <a href="#contact_sec" class="btn btn-dark text-sm">
                    Get in Touch
                  </a>
                </div>
              </div>
            </footer>
          </article>

          {/* Related Articles */}
          <Show when={allArticles().length > 0}>
            <section class="mt-20 pt-12 border-t border-gray-200">
              <h3 class="text-2xl font-medium text-gray-900 mb-8 text-center">More Articles</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <For each={allArticles().filter(a => a.slug !== article().slug).slice(0, 3)}>
                  {(relatedArticle) => (
                    <div
                      class="cursor-pointer group"
                      onClick={() => navigate(`/blogs/${relatedArticle.slug}`)}
                    >
                      <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <h4 class="font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p class="text-gray-600 text-sm line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </section>
          </Show>
        </Show>
      </div>
    </div>
  );
}