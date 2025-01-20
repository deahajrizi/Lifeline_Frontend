import React, { useState, useEffect } from 'react'
import "./progressBar.css"
export default function ProgressBar() {

    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercentage(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="progressBar">
      <div className="progressContainer">
        <div
          className="progressFill"
          style={{ height: `${scrollPercentage}%` }}
        >
        <div className="progressCircle"></div>

        </div>
      </div>
    </div>
  );
}
