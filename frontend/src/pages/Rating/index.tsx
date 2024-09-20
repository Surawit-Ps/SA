import React, { useState } from 'react';
import './Rating.css'; // Import the CSS file for styling
import { Rate } from 'antd';
import Button from 'react-bootstrap/Button';
import Card from 'antd/es/card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number>(3); // Default rating is 3 stars
  const [comment, setComment] = useState<string>('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle comment change
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Rating: ${rating}\nComment: ${comment}`);
    // Navigate to path '/' after form submission
    navigate('/');
  };

  return (
    <div style={{ padding: "60px", backgroundColor: "#f0f2f5" }}>
      <Card
        style={{
          maxWidth: "700px", // Increased outer card width
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "60px", // More padding inside the card
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <div className="rating-container">
          <h1>Rate Us</h1>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
            ขอบคุณที่ใช้ capylance
          </div>
          <div className="stars" style={{ textAlign: 'center', fontSize: '32px' }}>
            <Rate tooltips={desc} onChange={setRating} value={rating} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
            {rating ? <span>{desc[rating - 1]}</span> : null}
          </div>
          <p>Your rating: {rating} {rating === 1 ? 'star' : 'stars'}</p>
          <form onSubmit={handleSubmit}>
            <div className="comment-section">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                rows={5}
                placeholder="Write your comments here..."
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default Rating;
