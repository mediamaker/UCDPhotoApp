// Developed in June 2020 by John Cozen for UC Davis
// Based on 'React-photo-gallery' by @Neptunian on Github https://github.com/neptunian/react-photo-gallery

import React, { useState, useCallback } from "react";
import './App.css';
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";
import { photos } from "./photos";

function App() {
  //setup photo lightbox
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
    <Gallery photos={photos} onClick={openLightbox} />
    <ModalGateway>
      {viewerIsOpen ? (
        <Modal onClose={closeLightbox}>
          <Carousel
            currentIndex={currentImage}
            views={photos.map(x => ({
              ...x,
              srcset: x.srcSet,
              //TODO: Turn author value into photo caption in Lightbox view
              caption: x.author
            }))}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  </div>
  );
}

export default App;
