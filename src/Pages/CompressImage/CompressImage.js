import React, { useState } from "react";
import Dropzone from "react-dropzone";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  startLoading,
  stopLoading,
} from "../../config/Reducers/loadingSlice";
import { selectLink } from "../../config/Reducers/authSlice";

//Styling
import "./CompressImage.css";
import imageSvg from "../../images/image-svg.svg";
import { CircularProgress } from "@material-ui/core";
import { TiTickOutline } from "react-icons/ti";

import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
const CompressImage = () => {
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();
  const link = useSelector(selectLink);
  const [images, setImages] = useState([]);
  const [done, setDone] = useState(false);
  const [imageNames, setImagesName] = useState([]);

  const loadImage = (files) => {
    dispatch(startLoading());
    setDone(false);

    const formData = new FormData();

    files.forEach((file) => {
      const extensionLength = file.name.split(".").pop().length + 1;
      const imageName = file.name.slice(0, file.name.length - extensionLength);
      setImagesName((prev) => [...prev, imageName]);
      setImages((prev) => [...prev, URL.createObjectURL(file)]);

      formData.append("image", file, file.name);
    });

    Axios.post(link + "/compress", formData).then(({ data }) => {
      const newImages = data.map((data) => `data:image/jpeg;base64, ${data}`);
      setImages([...newImages]);
      setDone(true);
      dispatch(stopLoading());
    });
  };
  return (
    <div className='compress-image'>
      <Dropzone onDrop={loadImage}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className='drop-zone'>
            {loading && (
              <div className='loading-bar'>
                <CircularProgress className='spinner' />
              </div>
            )}
            <input {...getInputProps()} />
            {images.length ? (
              <>
                {images.map((image) => (
                  <>
                    <img src={image} key={image} />
                    {done && (
                      <div>
                        <h3>
                          تم تصغير الصورة <TiTickOutline />
                          <a download={uuidv4() + "-min.jpg"} href={image}>
                            تحميل
                          </a>
                        </h3>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : (
              <div>
                <img src={imageSvg} />
                <h3>ضع الصورة او اضغط هنا.</h3>
              </div>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default CompressImage;
