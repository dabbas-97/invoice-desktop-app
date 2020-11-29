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

const CompressImage = () => {
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();
  const link = useSelector(selectLink);
  const [image, setImage] = useState(null);
  const [done, setDone] = useState(false);
  const [imageName, setImageName] = useState("");
  const loadImage = (file) => {
    const extensionLength = file.name.split(".").pop().length + 1;
    setImageName(file.name.slice(0, file.name.length - extensionLength));
    setImage(URL.createObjectURL(file));
    setDone(false);
    const formData = new FormData();
    dispatch(startLoading());
    formData.append("image", file, file.name);
    Axios.post(link + "/compress", formData).then(({ data }) => {
      setImage(`data:image/jpeg;base64, ${data}`);
      setDone(true);
      dispatch(stopLoading());
    });
  };
  return (
    <div className='compress-image'>
      <Dropzone onDrop={(acceptedFiles) => loadImage(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className='drop-zone'>
            {loading && (
              <div className='loading-bar'>
                <CircularProgress className='spinner' />
              </div>
            )}
            <input {...getInputProps()} />
            {image ? (
              <img src={image} />
            ) : (
              <div>
                <img src={imageSvg} />
                <h3>ضع الصورة او اضغط هنا.</h3>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {done && (
        <div>
          <h3>
            تم تصغير الصورة <TiTickOutline />
            <a download={imageName + "-min.jpg"} href={image}>
              تحميل
            </a>
          </h3>
        </div>
      )}
    </div>
  );
};

export default CompressImage;
