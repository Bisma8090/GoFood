import React from "react";

export default function Carousel({ search, setSearch }) {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        {/* Search Bar */}
        <div className="carousel-caption" style={{ zIndex: 9 }}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2 w-75 bg-white text-dark"
              type="search"
              placeholder="Search in here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn text-white bg-danger"
              onClick={() => setSearch("")}
            >
              X
            </button>
          </div>
        </div>

        {/* Carousel Images */}
        <div className="carousel-item active">
          <img
            src="/images/beef-burger.avif"
            className="d-block w-100"
            style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }}
            alt="burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images/chicken-Barbeque-kebab.jpg"
            className="d-block w-100"
            style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }}
            alt="barbeque"
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images/pastry.jpg"
            className="d-block w-100"
            style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }}
            alt="pastry"
          />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
