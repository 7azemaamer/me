import { createSignal, createEffect, For, Show } from "solid-js";

export function Dashboard() {
  const [authenticated, setAuthenticated] = createSignal(false);
  const [pin, setPin] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [articles, setArticles] = createSignal([]);
  const [currentView, setCurrentView] = createSignal("list"); // "list", "edit", "create"
  const [currentArticle, setCurrentArticle] = createSignal(null);

  // Form fields
  const [title, setTitle] = createSignal("");
  const [slug, setSlug] = createSignal("");
  const [content, setContent] = createSignal("");
  const [excerpt, setExcerpt] = createSignal("");
  const [coverImage, setCoverImage] = createSignal("");
  const [tags, setTags] = createSignal("");

  // Authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/check-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin() }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      if (response.ok && data.success) {
        console.log("Authentication successful"); // Debug log
        setError(""); // Clear any previous errors
        await loadArticles();
        // Force authentication state change
        setAuthenticated(true);
      } else {
        console.log("Authentication failed:", data); // Debug log
        setError(data.error || "Invalid PIN");
      }
    } catch (err) {
      console.error("Authentication error:", err); // Debug log
      setError("Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  // Load articles
  const loadArticles = async () => {
    try {
      console.log("Loading articles..."); // Debug log
      const response = await fetch("/api/list-blogs");
      const data = await response.json();
      console.log("Articles response:", data); // Debug log
      if (data.success) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    }
  };

  // Create article
  const createArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pin(),
          title: title(),
          slug: slug(),
          content: content(),
          excerpt: excerpt(),
          cover_image: coverImage(),
          tags: tags()
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();
      if (data.success) {
        resetForm();
        setCurrentView("list");
        loadArticles();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  // Update article
  const updateArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/update-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pin(),
          id: currentArticle().id,
          title: title(),
          slug: slug(),
          content: content(),
          excerpt: excerpt(),
          cover_image: coverImage(),
          tags: tags()
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();
      if (data.success) {
        resetForm();
        setCurrentView("list");
        loadArticles();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const deleteArticle = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const response = await fetch("/api/delete-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin(), id }),
      });

      const data = await response.json();
      if (data.success) {
        loadArticles();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to delete article");
    }
  };

  // Edit article
  const editArticle = (article) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setSlug(article.slug);
    setContent(article.content);
    setExcerpt(article.excerpt || "");
    setCoverImage(article.cover_image || "");
    setTags(article.tags?.join(", ") || "");
    setCurrentView("edit");
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setSlug("");
    setContent("");
    setExcerpt("");
    setCoverImage("");
    setTags("");
    setCurrentArticle(null);
  };

  // Auto-generate slug from title
  createEffect(() => {
    if (title() && !currentArticle()) {
      const newSlug = title()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(newSlug);
    }
  });

  // Debug log
  console.log("Current authenticated state:", authenticated());

  // Login form
  if (!authenticated()) {
    console.log("Rendering login form");  
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
            <p class="mt-2 text-gray-600">
              Enter your PIN to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} class="mt-8 space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin()}
                onInput={(e) => setPin(e.target.value)}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Show when={error()}>
              <div class="text-red-600 text-sm text-center">{error()}</div>
            </Show>

            <button
              type="submit"
              disabled={loading()}
              class="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-black/80 disabled:opacity-50"
            >
              {loading() ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  console.log("Rendering dashboard");
  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-2xl font-bold text-gray-900">Blog Dashboard</h1>
            <div class="flex space-x-4">
              <button
                onClick={() => {
                  resetForm();
                  setCurrentView("list");
                }}
                class={`px-4 py-2 rounded-lg ${
                  currentView() === "list"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setCurrentView("create");
                }}
                class={`px-4 py-2 rounded-lg ${
                  currentView() === "create"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                New Article
              </button>
              <button
                onClick={() => {
                  setAuthenticated(false);
                  setPin("");
                }}
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Show when={error()}>
          <div class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error()}
          </div>
        </Show>

        {/* Article List View */}
        <Show when={currentView() === "list"}>
          <div class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">All Articles</h2>
            </div>
            <div class="divide-y divide-gray-200">
              <For each={articles()}>
                {(article) => (
                  <div class="p-6 flex justify-between items-center">
                    <div class="flex-1">
                      <h3 class="text-lg font-medium text-gray-900">
                        {article.title}
                      </h3>
                      <p class="text-gray-500 text-sm">/{article.slug}</p>
                      <p class="text-gray-600 mt-1">{article.excerpt}</p>
                      <div class="flex space-x-2 mt-2">
                        <For each={article.tags || []}>
                          {(tag) => (
                            <span class="px-2 py-1 bg-blue-100 text-black text-xs rounded">
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                      <button
                        onClick={() => editArticle(article)}
                        class="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>

        {/* Article Editor */}
        <Show when={currentView() === "create" || currentView() === "edit"}>
          <div class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">
                {currentView() === "edit"
                  ? "Edit Article"
                  : "Create New Article"}
              </h2>
            </div>

            <div class="p-6 space-y-6">
              {/* Title */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title()}
                  onInput={(e) => setTitle(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Article title"
                />
              </div>

              {/* Slug */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug()}
                  onInput={(e) => setSlug(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="article-slug"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={excerpt()}
                  onInput={(e) => setExcerpt(e.target.value)}
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the article"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={coverImage()}
                  onInput={(e) => setCoverImage(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Tags */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags()}
                  onInput={(e) => setTags(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              {/* Content Editor */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content()}
                  onInput={(e) => setContent(e.target.value)}
                  rows="20"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Write your article content here... (Markdown supported)"
                />
                <p class="text-sm text-gray-500 mt-1">
                  You can use Markdown syntax for formatting
                </p>
              </div>

              {/* Actions */}
              <div class="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    resetForm();
                    setCurrentView("list");
                  }}
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    currentView() === "edit" ? updateArticle : createArticle
                  }
                  disabled={loading()}
                  class="px-6 py-2 bg-black text-white rounded-lg hover:bg-black/80 disabled:opacity-50"
                >
                  {loading()
                    ? "Saving..."
                    : currentView() === "edit"
                    ? "Update Article"
                    : "Create Article"}
                </button>
              </div>
            </div>
          </div>
        </Show>
      </main>
    </div>
  );
}
