import React from "react";
import Projects from "./project/Projects";
import Header from "./Header/Header";
import Footer from "./footer/Footer";
import Banner from "./banner/Banner";
import About from "./about/About";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <About />
      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
