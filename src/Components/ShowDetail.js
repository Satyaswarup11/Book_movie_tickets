// src/Components/ShowDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`); // Fetching movie details of that specific movie
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetail();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 bg-black text-white">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-white">
            {show.image && show.image.medium && (
              <img
                src={show.image.medium}
                className="card-img-top"
                alt={show.name}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{show.name}</h5>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: show.summary }} />
              <Link to={`/book-ticket/${id}`} className="btn btn-danger">
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetail;
