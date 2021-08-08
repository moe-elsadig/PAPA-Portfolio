import React, { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Testimonials from "./Components/Testimonials";
import Portfolio from "./Components/Portfolio";

import "./App.css";

import * as THREE from "three";
import bgImage from "./1198935.jpg";

const App = () => {
  const [resumeData, setResumeData] = useState({});
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((data) => {
        setResumeData(data);
      });
  }, []);

  try {
    const scene = new THREE.Scene();

    // (view in degrees, aspect ratio, view frustrum, view frustrum)
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const spaceTexture = new THREE.TextureLoader().load(bgImage);

    scene.background = spaceTexture;

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(50).fill().forEach(addStar);

    function moveCamera() {
      camera.position.z += -0.01;
      camera.position.x += -0.0002;
      camera.rotation.y += -0.0002;
    }

    function animate() {
      requestAnimationFrame(animate);
      moveCamera();

      // controls.update();

      scene.background = theme ? new THREE.Color(0xffffff) : spaceTexture;
      renderer.render(scene, camera);
    }

    animate();

    // const canvas = document.querySelector("#bg");
    // const banner = document.querySelector("#banner");

    // let dataUrl = canvas.toDataURL();
    // banner.style.background = "url(" + dataUrl + ")";
  } catch (error) {
    console.log(error);
  }

  return (
    <div className={`App ${theme ? "" : "dark"}`}>
      <canvas id="bg" className="inline absolute z-0 top-0 left-0"></canvas>
      <Header
        data={resumeData.main}
        toggleTheme={() => setTheme(!theme)}
        theme={theme ? "Go dark" : "Go light"}
      />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      <Testimonials data={resumeData.testimonials} />
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;
