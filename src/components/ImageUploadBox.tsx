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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const base64Images: string[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const base64 = await convertToBase64(files[i]);
        base64Images.push(base64);
      }
    }

    setImages(base64Images);
    onImagesUpload(base64Images); // Resimler yüklendiğinde üst bileşene bildir
  };

  return (
    <div>
      <label>
        Images:
        <input type="file" multiple onChange={handleFileChange} />
      </label>

      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`event-thumbnail-${index}`} style={{ width: '100px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadBox;
