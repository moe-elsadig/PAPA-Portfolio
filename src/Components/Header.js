import React, { useState } from "react";
import TypeWriter from "react-typewriter";

const Header = ({ data, toggleTheme, theme }) => {
  if (data) {
    var name = data.name;
    var occupation = data.occupation;
    var description = data.description;
    var city = data.address.city;
    var networks = data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i
              className={`
                ${network.className} text-red-400 dark:text-white-600`}
            ></i>
          </a>
        </li>
      );
    });
  }

  return (
    <header id="home">
      <nav id="nav-wrap" className="bg-white dark:bg-gray-900 dark:opacity-80">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <button className="absolute left-10 top-5" onClick={toggleTheme}>
          {theme}
        </button>
        <ul id="nav" className="nav">
          <li>
            <a className={`${linkColors}`} href="#home">
              Home
            </a>
          </li>
          <li>
            <a className={`${linkColors}`} href="#about">
              About
            </a>
          </li>
          <li>
            <a className={`${linkColors}`} href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className={`${linkColors}`} href="#portfolio">
              Works
            </a>
          </li>
          <li>
            <a className={`${linkColors}`} href="#testimonials">
              Testimonials
            </a>
          </li>
          <li>
            <a className={`${linkColors}`} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div id="banner" className="row banner ">
        <div className="banner-text z-10 ">
          <h1 className="responsive-headline text-red-500 dark:text-white">
            <TypeWriter typing={0.5}>{name ? `I'm ${name}.` : null}</TypeWriter>
          </h1>
          <h3 className=" text-red-400 dark:text-green-600 backdrop-filter backdrop-blur-3xl rounded-full">
            Based in {city}.{" "}
            <span className="text-green-500 dark:text-white">{occupation}</span>{" "}
            {description}.
          </h3>
          <hr />
          <ul className="social color-red-400 dark:text-gray-600">
            {networks}
          </ul>
        </div>
      </div>
      <p className="scrolldown">
        <a className={`${linkColors}`} href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;

const linkColors = `smoothscroll text-red-800 active:text-orange-900 dark:text-gray-200 active:`;
