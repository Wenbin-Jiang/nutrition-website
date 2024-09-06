import React from "react";
import "./App.css";


const About = () => {
 return (
   <div className="about">
     <h1 className="about-title">About Nutrition-App</h1>


     <section className="about-mission">
       <h2>Our Mission</h2>
       <p>
         At Nutrition-App, our mission is to empower individuals to make informed dietary choices and lead healthier lives. We believe that nutrition is the foundation of wellness, and our goal is to provide the tools, resources, and inspiration needed to help you achieve your health and wellness goals.
       </p>
     </section>


     <section className="about-how-it-works">
       <h2>Our Vision</h2>
       <p>
       We envision a world where everyone has access to the knowledge and resources they need to maintain a balanced and nutritious diet. By offering personalized meal plans, healthy recipes, and expert advice, we aim to be your go-to resource for all things related to healthy eating.
       </p>
     </section>


     <section className="about-benefits">
       <h2>What We offer</h2>
       <ul>
         <li>Educational Content: Learn about the fundamentals of nutrition, dietary guidelines, and tips for maintaining a balanced diet. Our articles and infographics are designed to make healthy eating simple and accessible.</li>
         <li>Healthy Recipes: Discover a wide range of delicious and nutritious recipes tailored to various dietary needs. Whether you're looking for vegetarian, vegan, gluten-free, or low-carb options, we've got you covered.</li>
         <li>Nutritional Check: Curious about the nutritional value of your meals? Use our Nutritional Check feature, powered by the Edamam Nutrition Analysis API, to analyze the ingredients and recipes you love.</li>
       </ul>
     </section>


     <section className="about-tips">
       <h2>Join Us on Your Healthy Eating Journey</h2>
       <p>
       Whether you're just starting your journey toward better health or you're a seasoned pro, [Your Website Name] is here to support you every step of the way. Together, we can build a healthier, happier future.
       </p>
     </section>
   </div>
 );
};


export default About;
