import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../styles/MainContent.css";
import { SearchBar } from "./SearchBar";
import { BookCard } from "./BookCard";
import {
  getFeaturedBooks,
  getBooksBySubject,
  searchBooks,
  transformGoogleBooksResponse,
  addMockReviewData,
} from "../services/googleBooksApi";

// Sample book reviews data (fallback)
const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://books.google.com/books/content?id=iJZYAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    rating: 0,
    reviewCount: 0,
    genre: "Classic Literature",
    review:
      "A masterpiece of American literature. Fitzgerald's prose is beautiful and the story of Jay Gatsby is both tragic and captivating. The themes of love, wealth, and the American Dream are expertly woven throughout.",
    reviewer: "Sarah Johnson",
    reviewerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b765?w=150",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover:
      "https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    rating: 0,
    reviewCount: 0,
    genre: "Fiction",
    review:
      "An incredible story about justice, morality, and growing up in the American South. Scout's perspective is both innocent and profound. This book tackles difficult subjects with grace and power.",
    reviewer: "Michael Chen",
    reviewerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover:
      "https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    rating: 0,
    reviewCount: 0,
    genre: "Dystopian",
    review:
      "A chilling dystopian novel that feels more relevant than ever. Orwell's vision of a totalitarian society is both terrifying and thought-provoking. The concepts of Big Brother and doublethink are unforgettable.",
    reviewer: "Emma Williams",
    reviewerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    date: "2024-01-08",
  },
];

const MainContent = () => {
  const { genre } = useParams();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [route, setRoute] = useState("home");

  useEffect(() => {
    const onNavigate = (e) => {
      const r = e?.detail?.route || "404";
      if (r === "home") {
        // refresh: re-run fetch
        setRoute("home");
        setLoading(true);
        // trigger fetch by calling the same fetch logic - we'll reuse effect by toggling a dummy state
        // simplest approach: call the fetchBooks function directly here via a small helper
        fetchBooksHelper();
      } else {
        setRoute("404");
      }
    };

    window.addEventListener("app:navigate", onNavigate);
    return () => window.removeEventListener("app:navigate", onNavigate);
  }, []);

  // Fetch featured books on component mount
  // we'll expose a fetch helper so nav can trigger refresh directly
  // Fetch books logic
  const fetchBooksHelper = async () => {
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(""); // Reset search when switching genres/home
      
      let response;
      if (genre) {
        response = await getBooksBySubject(genre, 12);
      } else {
        response = await getFeaturedBooks(12);
      }
      
      const transformedBooks = transformGoogleBooksResponse(response);
      const booksWithReviews = transformedBooks.map(addMockReviewData);
      setBooks(booksWithReviews);
    } catch (err) {
      setError("Failed to fetch books. Please try again later.");
      console.error("Error fetching books:", err);
      // Fallback to sample data if API fails and we are on home
      if (!genre) setBooks(sampleBooks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksHelper();
  }, [genre, location.pathname]); // Re-run when genre or path changes

  // Handle search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      // If empty query, reload featured books
      setSearchQuery("");
      setIsSearching(false);
      const response = await getFeaturedBooks(12);
      const transformedBooks = transformGoogleBooksResponse(response);
      const booksWithReviews = transformedBooks.map(addMockReviewData);
      setBooks(booksWithReviews);
      return;
    }

    try {
      setIsSearching(true);
      setSearchQuery(query);
      setError(null);

      const response = await searchBooks(query, 15);
      const transformedBooks = transformGoogleBooksResponse(response);
      const booksWithReviews = transformedBooks.map(addMockReviewData);
      setBooks(booksWithReviews);
    } catch (err) {
      setError(`Failed to search for "${query}". Please try again.`);
      console.error("Error searching books:", err);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <SearchBar />
        <header className="content-header">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Loading amazing books for you...</p>
        </header>
        <div className="reviews-container">
          <div className="loading-message">
            <p>🔍 Searching for great books...</p>
          </div>
        </div>
      </div>
    );
  }
  if (route === "404") {
    return (
      <div className="main-content">
        <SearchBar />
        <header className="content-header">
          <h1>Page Not Found</h1>
          <p>The section you selected hasn't been implemented yet.</p>
        </header>
        <div className="reviews-container">
          <div className="notfound-404">
            <h2>404</h2>
            <p>
              This section is coming soon. Use the Home icon to refresh or
              return.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <SearchBar onSearch={handleSearch} />

      <header className="content-header">
        <h1>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : genre
            ? `Exploring ${genre.charAt(0).toUpperCase() + genre.slice(1)}`
            : "Discover Your Next Favorite Book"}
        </h1>
        <p>
          {searchQuery
            ? `Found ${books.length} book${
                books.length !== 1 ? "s" : ""
              } matching your search`
            : "See what others are reading and share your thoughts"}
          {isSearching && " - Searching..."}
        </p>
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <p>Showing available books instead.</p>
          </div>
        )}
      </header>

      <div className="reviews-container">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
            rating={book.rating}
            reviewCount={book.reviewCount}
            genre={book.genre}
            review={book.review}
            description={book.description}
            reviewer={book.reviewer}
            reviewerAvatar={book.reviewerAvatar}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
