import React, { useState } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import PreviewImages from "./PreviewImages";
import axios from "axios";
import styles from "./UploadImages.module.scss";

/*TODO:  
- Progress bar 
*/

function UploadImages() {
  const [borderColor, setBorderColor] = useState(true);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(false);

  /* FUNCTION */
  const handleChange = e => {
    setImages(Array.from(e.target.files));
  };

  const addImages = e => {
    setImages(images.concat(Array.from(e.target.files)));
  };

  const removeImages = e => {
    let imagesToRemove = e.currentTarget.id;
    images.splice(imagesToRemove, 1);
    setImages(Array.from(images));
  };

  /* POST */
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (let image of images) {
      formData.append("file", image);
    }
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
    } catch (err) {
      if ((err.res.status = 500)) {
        console.log("There is a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  /* STYLE */
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
  return (
    <div className={styles.imageUploader}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className={styles.Images}>
          <h1>
            <Form.Label>Image uploader</Form.Label>
          </h1>
          <Form.Text className={styles.info}>
            Upload by either clicking or drag/drop...
          </Form.Text>
          <div
            className={[styles.dragContainer, borderClass].join(" ")}
            title=""
          >
            <Form.Control
              className={
                images.length === 0 ? styles.dragArea : styles.dragAreaNone
              }
              type="file"
              accept="image/*"
              onChange={handleChange}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDragLeave}
              multiple
              required
            ></Form.Control>
            <PreviewImages
              style={styles.uploadImage}
              images={images}
              handleChange={addImages}
              removeFotografie={removeImages}
            />
          </div>
        </Form.Group>
        <ProgressBar
          striped
          now={progress}
          label={`${progress}%`}
          style={progress ? { display: "block" } : { display: "none" }}
        />
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default UploadImages;
