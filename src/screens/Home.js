import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch food items and categories from backend
  const loadFoodItems = async () => {
    try {
      let response = await fetch("https://your-backend.up.railway.app/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      response = await response.json();

      setFoodItems(response[0] || []);
      setFoodCat(response[1] || []);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel search={search} setSearch={setSearch} />

      <div className="container mt-4">
        {foodCat.length > 0 ? (
          foodCat.map(cat => (
            <div className="row mb-4" key={cat._id || cat.CategoryName}>
              <div className="fs-3 m-2">{cat.CategoryName}</div>
              <hr
                style={{
                  height: "4px",
                  backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))"
                }}
              />

              {foodItems.length > 0 ? (
                foodItems
                  .filter(
                    item =>
                      item.CategoryName === cat.CategoryName &&
                      item.name &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(item => (
                    <div key={item._id || item.name} className="col-12 col-md-6 col-lg-3 mb-3">
                      <Card
                        foodName={item.name}
                        item={item}
                        options={item.options[0]}
                        ImgSrc={item.img}
                      />
                    </div>
                  ))
              ) : (
                <div className="text-muted">No Items Found</div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center mt-5">Loading Categories...</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
