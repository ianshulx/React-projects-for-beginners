import React, { useState, useEffect } from "react";
import { Star, Heart, Bookmark, MessageCircle } from "lucide-react";
import { saveBook, unsaveBook, isBookSaved } from "../utils/savedBooks";
import { getBookStats, addReview, getUserReview } from "../utils/reviews";
import { getUser } from "../utils/auth";
import { upsertReviewedBookForUser } from "../utils/reviewedBooks";

export const BookCard = ({
  id,
  title,
  author,
  cover,
  rating: initialRating,
  reviewCount: initialReviewCount,
  genre,
  review,
  description,
  reviewer,
  reviewerAvatar,
  showReviewContent = false, // require explicit opt-in to show default reviews
  // ...otherProps
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState(initialRating || 0);
  const [reviewCount, setReviewCount] = useState(initialReviewCount || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverUserRating, setHoverUserRating] = useState(0);
  const descriptionText = description ?? review;

  // Initialize isSaved from localStorage and load real-time ratings
  useEffect(() => {
    if (id !== undefined) {
      setIsSaved(isBookSaved(id));

      // Load real ratings from reviews
      const stats = getBookStats(id);
      setRating(stats.rating);
      setReviewCount(stats.reviewCount);

      // Load user's existing review if any
      const user = getUser();
      if (user) {
        const existingReview = getUserReview(id, user.name);
        if (existingReview) {
          setUserRating(existingReview.rating);
          setReviewText(existingReview.text || "");
        }
      }
    }
    // eslint-disable-next-line
  }, [id]);

  // Listen for review updates
  useEffect(() => {
    const handleReviewUpdate = (e) => {
      if (e.detail?.bookId === id) {
        const stats = getBookStats(id);
        setRating(stats.rating);
        setReviewCount(stats.reviewCount);
      }
    };

    window.addEventListener("reviews:updated", handleReviewUpdate);
    return () =>
      window.removeEventListener("reviews:updated", handleReviewUpdate);
  }, [id]);

  const handleSaveClick = () => {
    if (isSaved) {
      unsaveBook(id);
      setIsSaved(false);
    } else {
      // Save all book props needed for BookCard
      saveBook({
        id,
        title,
        author,
        cover,
        rating,
        reviewCount,
        genre,
        review,
        description,
        reviewer,
        reviewerAvatar,
      });
      setIsSaved(true);
    }
    // Optionally, dispatch an event to notify sidebar/favorites
    window.dispatchEvent(new Event("savedBooks:updated"));
  };

  const handleStarClick = (starRating) => {
    // Quick rate - add a rating without text review
    const user = getUser();
    if (!user) {
      alert("Please sign in to rate books");
      return;
    }

    const existingReview = getUserReview(id, user.name);

    const success = addReview(id, {
      rating: starRating,
      text: existingReview?.text || reviewText || "", // Preserve existing review text if any
      userName: user.name,
      userAvatar: user.avatarUrl || "",
    });

    if (success) {
      // Ensure this book appears in My Reviews for this user
      upsertReviewedBookForUser(user.name, {
        id,
        title,
        author,
        cover,
        rating,
        reviewCount,
        genre,
        review,
        description,
        reviewer,
        reviewerAvatar,
      });
      setUserRating(starRating);
      if (existingReview) {
        // Rating updated successfully
      }
    }
  };

  const handleReviewClick = () => {
    const user = getUser();
    if (!user) {
      alert("Please sign in to write a review");
      return;
    }
    setIsReviewing(true);
    // Scroll to review section
    setTimeout(() => {
      const reviewSection = document.querySelector(`#review-section-${id}`);
      if (reviewSection) {
        reviewSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
        const textarea = reviewSection.querySelector("textarea");
        if (textarea) textarea.focus();
      }
    }, 100);
  };

  const handleSubmitReview = () => {
    const user = getUser();
    if (!user) {
      alert("Please sign in to submit a review");
      return;
    }

    if (userRating === 0) {
      alert("Please select a rating (click on stars above)");
      return;
    }

    const success = addReview(id, {
      rating: userRating,
      text: reviewText.trim(),
      userName: user.name,
      userAvatar: user.avatarUrl || "",
    });

    if (success) {
      // Ensure this book appears in My Reviews for this user
      upsertReviewedBookForUser(user.name, {
        id,
        title,
        author,
        cover,
        rating,
        reviewCount,
        genre,
        review,
        description,
        reviewer,
        reviewerAvatar,
      });
      setIsReviewing(false);
      // Keep reviewText so it shows in the placeholder after submit
    } else {
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleCancelReview = () => {
    setIsReviewing(false);
    // Reset to original review if user had one, otherwise clear
    const user = getUser();
    if (user) {
      const existingReview = getUserReview(id, user.name);
      if (existingReview) {
        setReviewText(existingReview.text || "");
        setUserRating(existingReview.rating);
      } else {
        setReviewText("");
        setUserRating(0);
      }
    }
  };

  return (
    <div className="book-card-modern">
      <div className="book-card-content">
        {/* Book Cover */}
        <div className="book-cover-container">
          <div className="book-cover-image">
            <img
              src={cover}
              alt={title}
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='176' viewBox='0 0 128 176'%3E%3Crect width='128' height='176' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='40' fill='%236c757d'%3E📖%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="book-details">
          <div className="book-header">
            <div className="book-main-info">
              <h3 className="book-card-title">{title}</h3>
              <p className="book-card-author">by {author}</p>

              <div className="rating-info">
                <div className="stars-container">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${
                        i < Math.floor(hoverRating || rating)
                          ? "star-filled"
                          : "star-empty"
                      } star-interactive`}
                      onClick={() => handleStarClick(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                  <span className="rating-text">
                    {rating > 0 ? rating : "No ratings yet"}
                  </span>
                </div>
                <span className="review-count">
                  {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
              </div>

              <div className="genre-badge">{genre}</div>
            </div>
          </div>

          {/* Book description under title (always show if present) */}
          {descriptionText ? (
            <div className="review-section">
              <p className="review-text">{descriptionText}</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="book-card-actions">
        <button
          className={`action-button ${isLiked ? "liked" : ""}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`action-icon ${isLiked ? "filled" : ""}`} />
          <span>Like</span>
        </button>
        <button className="action-button" onClick={handleReviewClick}>
          <MessageCircle className="action-icon" />
          <span>Review</span>
        </button>
        <button
          className={`action-button save-button ${isSaved ? "saved" : ""}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Unsave book" : "Save book"}
        >
          <Bookmark className={`action-icon ${isSaved ? "filled" : ""}`} />
        </button>
      </div>

      {/* Reviewer / Placeholder - Below Actions */}
      <div className="reviewer-section" id={`review-section-${id}`}>
        {isReviewing ? (
          <div className="review-input-container">
            <div className="review-rating-selector">
              <span className="review-rating-label">Your rating:</span>
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`review-star ${
                      star <= (hoverUserRating || userRating)
                        ? "star-filled"
                        : "star-empty"
                    }`}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverUserRating(star)}
                    onMouseLeave={() => setHoverUserRating(0)}
                  />
                ))}
                <span className="review-rating-text">
                  {userRating > 0
                    ? `${userRating} star${userRating > 1 ? "s" : ""}`
                    : "Select rating"}
                </span>
              </div>
            </div>
            <textarea
              className="review-textarea-input"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <div className="review-actions">
              <button
                className="review-btn review-btn-cancel"
                onClick={handleCancelReview}
              >
                Cancel
              </button>
              <button
                className="review-btn review-btn-submit"
                onClick={handleSubmitReview}
                disabled={userRating === 0}
              >
                Submit Review
              </button>
            </div>
          </div>
        ) : (
          <div
            className="review-placeholder"
            onClick={handleReviewClick}
            style={{ cursor: "pointer" }}
          >
            <div
              className="review-input-mock"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              {(() => {
                const user = getUser();
                if (user && reviewText) {
                  return (
                    <>
                      <img
                        src={
                          user.avatarUrl ||
                          "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(user.name)
                        }
                        alt={user.name}
                        className="reviewer-avatar"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          background: "#e9ecef",
                        }}
                      />
                      <span
                        className="reviewer-name"
                        style={{ fontWeight: 500, color: "#495057" }}
                      >
                        {user.name}
                      </span>
                      <span className="review-input-text">
                        {reviewText.length > 50
                          ? reviewText.substring(0, 50) + "..."
                          : reviewText}
                      </span>
                    </>
                  );
                }
                return (
                  <>
                    <MessageCircle className="review-input-icon" />
                    <span className="review-input-text">
                      Be the first to review...
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
