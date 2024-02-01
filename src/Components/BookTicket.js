import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    user: '',
    email: '',
  });

  useEffect(() => {
    // Fetching the specific movie details using the API based on the provided id
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Storing user details in local storage
    localStorage.setItem('userDetails', JSON.stringify(formData));
    // Redirecting to the home page after submitting the form
    navigate('/');
  };

  return (
    <div className="container mt-4 bg-black text-white">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Book Tickets</h5>
              <form onSubmit={handleSubmit}>
                {movie && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="movie" className="form-label">
                        Movie
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="movie"
                        name="movie"
                        value={movie.name}  // Movie name of that specific movie
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="runtime" className="form-label">
                        Runtime
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="runtime"
                        name="runtime"
                        value={`${movie.runtime} minutes`} // Movie runtime of that specific movie
                        readOnly
                      />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    User
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTicket;
