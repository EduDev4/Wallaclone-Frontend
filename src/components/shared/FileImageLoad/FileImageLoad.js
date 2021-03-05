import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import './FileImageLoad.css';

const FileImageLoad = ({ onFileSelect, imgUrl }) => {
  const [file, setFile] = useState(null);
  const inputRef = createRef(null);

  const handleFileInput = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    const { current: fileInput } = inputRef;
    fileInput.click();
  };

  return (
    <div className="fileLoad">
      <div className="fileLoad-file">
        <button
          type="button"
          className="addimage-wrapper"
          onClick={handleClick}
        >
          <img
            className="addimage-icon"
            src={`${process.env.REACT_APP_PUBLIC_URL}/icons/add-photo-80.png`}
            alt="Add file"
          />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/x-png,image/jpeg"
          id="file"
          onChange={handleFileInput}
          hidden
        />
      </div>
      <div className="fileLoad-filename">
        {file && `Filename: ${file.name}`}
      </div>
      <div className="fileLoad-image">
        <Image
          width={200}
          height={200}
          src={
            file
              ? URL.createObjectURL(file)
              : `${process.env.REACT_APP_API_BASE_URL}${imgUrl}`
          }
        />
      </div>
    </div>
  );
};

FileImageLoad.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  imgUrl: PropTypes.string,
};

FileImageLoad.defaultProps = {
  imgUrl: '',
};

export default FileImageLoad;
