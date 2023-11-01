import React, { useEffect, useRef, useState } from 'react';
import OpenSeadragon from'openseadragon';



function App() {
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = ["https://directorsblog.nih.gov/wp-content/uploads/2013/07/kidneycancer2.jpg", "https://media.istockphoto.com/id/531314246/photo/adenocarcinoma.jpg?s=612x612&w=0&k=20&c=y0jJSS8HmIoT93b03FUwy_-Bj0Dr5NzhWyatDrhO2kE="]

  useEffect(() => {
    const osdViewer = new OpenSeadragon({
      id: 'openseadragon-viewer',
      prefixUrl: '',
      constrainDuringPan: true,
      maxZoomPixelRatio: 5,
      tileSources: [
        {
          type: 'image',
          url: imageUrls[currentIndex],
          minLevel: 8,
          zoomPerScroll: 1,
          overlap: 10,
          tileSize: 256,
          x: 1000,
          y: 0,
        },
      ],
      zoomInButton: 'zoom-in',
      zoomOutButton: 'zoom-out',
      homeButton: 'home',
      fullPageButton: 'full-page',
      nextButton: 'next',
      previousButton: 'previous',
    });
    viewerRef.current = osdViewer;
    
    
    

    
  }, [currentIndex]);

  const setZoomInFactor = () => {
    if (viewerRef.current) {
      const viewport = viewerRef.current.viewport;
      const zoomFactor = 0.7; // Adjust the zoom factor as needed
      viewport.zoomBy(zoomFactor);
    }
  }

  const setPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  }
  const setNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  }


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div id="openseadragon-viewer" style={{ height: "400px", padding: "10px" , backgroundColor: "black" }} ref={viewerRef}></div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div id="openseadragon-buttons" className="btn-group" role="group">
            <button className="btn btn-primary mr-2" id="zoom-in" onClick={setZoomInFactor}>Zoom In</button>
            <button className="btn btn-primary mr-2" id="zoom-out">Zoom Out</button>
            <button className="btn btn-primary mr-2" id="home">Home</button>
            <button className="btn btn-primary mr-2" id="full-page">Full Page</button>
            <button className="btn btn-primary mr-2" id="next" onClick={setNextImage}>Next</button>
            <button className="btn btn-primary" id="previous" onClick={setPrevImage}>Previous</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
