import React, { useState, useEffect } from "react";
import NutFacts from "./APIChild";
import ImageChild from "./ImageChild";
import "./App.css";
import { useSearchParams } from "react-router-dom";

const API = () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [nutrition, setNutriton] = useState(null);
  const [image, setImage] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("foodName") || "";
    const qty = searchParams.get("quantity") || "";
    const sz = searchParams.get("size") || "";

    if (name && qty) {
      setFoodName(name);
      setQuantity(qty);
      setSize(sz);

      const url =
        `https://api.edamam.com/api/nutrition-data?app_id=c0d98614&app_key=94ac4003252bf55af94532ff047c420d&nutrition-type=cooking&ingr=${encodeURIComponent(qty)}%20${encodeURIComponent(sz)}%20${encodeURIComponent(name)}`;

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setNutriton(data);
        })
        .catch((error) => console.log(error));
    }
  }, [searchParams]);

  const submitHandler = (e) => {
    e.preventDefault();
    const url =
      `https://api.edamam.com/api/nutrition-data?app_id=c0d98614&app_key=94ac4003252bf55af94532ff047c420d&nutrition-type=cooking&ingr=${encodeURIComponent(quantity)}%20${encodeURIComponent(size)}%20${encodeURIComponent(foodName)}`;

      const url2 =
        "https://api.unsplash.com/search/photos?query=" +
        foodName +
        "&client_id=EHum0aoJDbGws2umk5ng02kCBKvkfdvf6963N5zIjbI";
  
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setNutriton(data);
        console.log(data);
      })
      .catch((error) => console.log(error));

      fetch(url2)
      .then((resp) => resp.json())
      .then((data) => {
        setImage(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const addToFavorites = () => {
    if (nutrition) {
      const newFavorite = { foodName, quantity, size, nutrition };
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorite = storedFavorites.some(
        (item) =>
          item.foodName === newFavorite.foodName &&
          item.quantity === newFavorite.quantity &&
          item.size === newFavorite.size
      );

      if (isFavorite) {
        alert("This item is already in your favorites!");
        return;
      }

      const updatedFavorites = [...storedFavorites, newFavorite];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Added to favorites!");
    }
  };

  const foodHandler = (e) => {
    setFoodName(e.target.value);
  };

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const sizeHandler = (e) => {
    setSize(e.target.value);
  };

  const renderNutrition = () => {
    if (nutrition) {
      return (
        <>
          <NutFacts
            calories={Math.round(nutrition.calories ?? 0)}
            fat={Math.floor(nutrition.totalNutrients?.FAT?.quantity ?? 0)}
            sFat={Math.floor(nutrition.totalNutrients?.FASAT?.quantity ?? 0)}
            tFat={Math.floor(nutrition.totalNutrients?.FATRN?.quantity ?? 0)}
            cholesterol={Math.floor(nutrition.totalNutrients?.CHOLE?.quantity ?? 0)}
            sodium={Math.floor(nutrition.totalNutrients?.NA?.quantity ?? 0)}
            carbs={Math.floor(nutrition.totalNutrients?.CHOCDF?.quantity ?? 0)}
            protein={Math.floor(nutrition.totalNutrients?.PROCNT?.quantity ?? 0)}
            fiber={Math.floor(nutrition.totalNutrients?.FIBTG?.quantity ?? 0)}
            sugar={Math.floor(nutrition.totalNutrients?.SUGAR?.quantity ?? 0)}
            vitaminD={Math.floor(nutrition.totalNutrients?.VITD?.quantity ?? 0)}
            calcium={Math.floor(nutrition.totalNutrients?.CA?.quantity ?? 0)}
            iron={Math.floor(nutrition.totalNutrients?.FE?.quantity ?? 0)}
            potassium={Math.floor(nutrition.totalNutrients?.K?.quantity ?? 0)}
          />
        </>
      );
    }
    return null;
  };

  const renderImage = () => {
    if (image && image.results && image.results.length > 0) {
      return (
        <>
          <ImageChild url={image.results[0].urls.small} name="ImageAPI" />
        </>
      );
    } else {
      return <p>No image available for this food item.</p>;  // Fallback message
    }
  };
  
  return (
    <div className="about2">
    <div className="api-page">
      <h1>Nutritional Facts</h1>
      <form onSubmit={submitHandler} className="nutritional-form">
        <label>Enter Food Name</label>
        <input
          type="text"
          name="foodName"
          onChange={foodHandler}
          value={foodName}
        />
        <label>Enter Quantity</label>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={quantityHandler}
        />
        <label>Enter Size (If Applicable)</label>
        <input type="text" name="size" value={size} onChange={sizeHandler} />
        <button type="submit">Submit</button>
      </form>

    <div className="results-container">
      {renderNutrition()}
      {renderImage()}
    </div>  

    <button onClick={addToFavorites} className="btn btn-secondary">Add to Favorites</button>

    </div>
    </div>
  );
};

export default API;
