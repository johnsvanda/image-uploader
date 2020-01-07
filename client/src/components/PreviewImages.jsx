import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./PreviewImages.module.scss";
import uploadImage from "./uploadImage.png";

function PreviewImages(props) {
  const images = props.images;
  const [borderColor, setBorderColor] = useState(true);

  const handleDragOver = () => {
    if (borderColor) {
      setBorderColor(false);
    }
  };
  const handleDragLeave = () => {
    if (!borderColor) {
      setBorderColor(true);
    }
  };

  let borderClass = borderColor ? styles.gray : styles.blue;

  let i = -1;
  if (images.length !== 0) {
    let imagesPreview = images.map(image => (
      <div className={styles.imageContainer} id={(i = i + 1)} key={i}>
        <img
          src={URL.createObjectURL(image)}
          alt="uploadPreview"
          className={styles.image}
        />
        <div className={styles.overlay} onClick={props.removeFotografie} id={i}>
          <FontAwesomeIcon icon={faTrash} className={styles.closeIcon} />
        </div>
      </div>
    ));
    return (
      <div>
        <div className={styles.imagesContainer}>
          {imagesPreview}
          <div className={[styles.addImage, borderClass].join(" ")}>
            <Form.Control
              className={styles.dragArea}
              type="file"
              accept="image/*"
              onChange={props.handleChange}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDragLeave}
              multiple
            ></Form.Control>
            <FontAwesomeIcon icon={faPlusCircle} className={styles.addIcon} />
          </div>
        </div>
      </div>
    );
  } else {
    return <img src={uploadImage} alt="upload" className={props.style} />;
  }
}

export default PreviewImages;
