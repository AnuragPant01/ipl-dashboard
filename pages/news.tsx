import { useState } from "react";
import Header from "../components/common/Header";
import newsData from "../lib/mocks/news.json";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const categories = ["All", ...newsData.categories];
  const filteredNews =
    selectedCategory === "All"
      ? newsData.news
      : newsData.news.filter((article) => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Header */}
        <header className="text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
            IPL 2025 News
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg sm:text-xl">
            Latest updates, match reports, and exclusive stories from IPL 2025
          </p>
        </header>

        {/* Categories */}
        <nav className="flex gap-3 overflow-x-auto px-2 sm:px-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"style={{
    scrollbarWidth: "none",      // Firefox
    msOverflowStyle: "none",     // IE 10+
  }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2 font-semibold transition-colors duration-300
                ${
                  selectedCategory === category
                    ? "bg-white text-gray-900 shadow-md shadow-gray-600"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* News Grid or Article Detail */}
        {selectedArticle === null ? (
          <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 sm:h-56 md:h-48 object-cover"
                  loading="lazy"
                />

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 text-sm flex-grow line-clamp-3">{article.summary}</p>

                  <div className="flex justify-between text-xs text-gray-500 mt-4 mb-3">
                    <span>{article.author}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-yellow-900 bg-yellow-200 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article.id)}
                    className="mt-auto bg-gray-800 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition"
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <article className="px-4 sm:px-0 max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <button
              onClick={() => setSelectedArticle(null)}
              className="mb-6 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to News
            </button>

            {(() => {
              const article = newsData.news.find((a) => a.id === selectedArticle);
              if (!article) return null;

              return (
                <>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full rounded-lg h-64 md:h-96 object-cover mb-8 shadow-md"
                    loading="lazy"
                  />

                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-800 text-sm">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                      {article.title}
                    </h1>

                    <div className="flex justify-between text-sm text-gray-600 mb-8">
                      <span>By {article.author}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-1 rounded-full bg-yellow-200 text-yellow-900 font-semibold text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-800 leading-relaxed">{article.content}</p>
                  </div>
                </>
              );
            })()}
          </article>
        )}
      </main>
    </div>
  );
}
