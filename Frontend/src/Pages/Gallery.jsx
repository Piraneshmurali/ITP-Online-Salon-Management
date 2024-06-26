import React, { useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const images = [
    {
      src: require("../assets/images/Gallery1.jpg").default,
      alt: "Image 1",
    },
    {
      src: require("../assets/images/Gallery2.jpg").default,
      alt: "Image 2",
    },
    {
      src: require("../assets/images/Gallery3.jpg").default,
      alt: "Image 3",
    },
    {
      src: require("../assets/images/Gallery4.jpg").default,
      alt: "Image 4",
    },
    {
      src: require("../assets/images/Gallery5.jpg").default,
      alt: "Image 5",
    },
    {
      src: require("../assets/images/Gallery6.jpg").default,
      alt: "Image 6",
    },
    {
      src: require("../assets/images/Gallery7.jpg").default,
      alt: "Image 7",
    },
    {
      src: require("../assets/images/Gallery8.jpg").default,
      alt: "Image 8",
    },
    {
      src: require("../assets/images/Gallery9.jpg").default,
      alt: "Image 9",
    },
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">
        For men in need of pampering, Olex’s is a full service barbershop that
        provides an environment where men can relax and come out feeling good
        about themselves. Dedicated to bringing the best out of our clients,
        olex's Barbers stands out from the traditional barbershop experience and
        goes beyond its services to create the perfect ambience with
        well-trained barbers and therapists to cater to our clients’ needs.
      </h1>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => handleImageClick(image)}
          >
            <img src={image.src} alt={image.alt} className="gallery-image" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
