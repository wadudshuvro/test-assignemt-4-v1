import { useState } from "react";
import Footer from "./components/Footer";
import useNewsQuery from "./hooks/useNewsQuery";

const categories = [
  "general",
  "business",
  "entertainment",
  "technology",
  "science",
  "health",
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useNewsQuery(selectedCategory, searchTerm);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCategory("");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const articlesKey = searchTerm.trim() ? "result" : "articles";
  const articles = (data && data[articlesKey]) || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  return (
    <div className="container mx-auto px-4">
      {/* Logo and Header */}
      <header className="text-center py-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto"
          style={{ height: "50px" }}
        />
      </header>

      <div className="mb-4 text-center">
        {categories.map((category) => (
          <span
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="text-black font-bold hover:text-green-500 cursor-pointer px-2"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search news by title..."
          className="px-4 py-2 border rounded w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white shadow p-4 rounded">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="rounded mb-4"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <div>
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="mb-2">{formatDate(article.publishedAt)}</p>
                <p>{article.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No news found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
