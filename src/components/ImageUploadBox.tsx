import React, { useState } from 'react';

interface ImageUploadProps {
  onImagesUpload: (images: string[]) => void; // Resimler yüklendiğinde üst bileşene bildirir
}

const ImageUploadBox: React.FC<ImageUploadProps> = ({ onImagesUpload }) => {
  const [images, setImages] = useState<string[]>([]);

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleImageRemove = (indexToRemove: number) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const base64Images: string[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const base64 = await convertToBase64(files[i]);
        base64Images.push(base64);
      }
    }

    setImages((prevImages) => [...prevImages, ...base64Images]);
    onImagesUpload(base64Images);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    const base64Images: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const base64 = await convertToBase64(files[i]);
      base64Images.push(base64);
    }

    setImages((prevImages) => [...prevImages, ...base64Images]);
    onImagesUpload(base64Images);
  };

  return (
    <div>
      <label>
        Images:
        <input type="file" multiple onChange={handleFileChange} />
      </label>

      <div style={{ border: '2px dashed gray', padding: '20px', marginTop: '10px', textAlign: 'center' }} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        Drag & Drop Images Here
      </div>

      <div>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
            <img src={image} alt={`event-thumbnail-${index}`} style={{ width: '100px' }} />
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'white',
                color: 'black',
                cursor: 'pointer',
                padding: '1px 3px',
              }}
              onClick={() => handleImageRemove(index)}
            >
              ×
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadBox;
