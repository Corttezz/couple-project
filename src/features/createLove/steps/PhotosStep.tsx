import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export const PhotosStep = ({ 
  value, 
  onChange, 
  onNext,
  onPrev
}: { 
  value: File[]; 
  onChange: (value: File[]) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const t = useTranslations('CreateLove.form');
  const [dragActive, setDragActive] = useState(false);
  const [mainPhoto, setMainPhoto] = useState<File | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % value.length);
    }, 5000); // Change photo every 5 seconds
    return () => clearInterval(interval);
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      );
      onChange([...value, ...newFiles]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onChange([...value, ...newFiles]);
    }
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...value];
    newPhotos.splice(index, 1);
    onChange(newPhotos);
  };

  const selectMainPhoto = (file: File) => {
    setMainPhoto(file);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{t('step5_title')}</h2>
        <p className="text-muted-foreground mb-4">{t('step5_description')}</p>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
          />
          <label 
            htmlFor="photo-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            <svg
              className="w-12 h-12 text-muted-foreground mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            <span className="text-sm font-medium text-primary">
              {t('upload_photos')}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {t('drag_drop_photos')}
            </span>
          </label>
        </div>
        
        {value.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {value.map((file, index) => (
              <div key={index} className="relative group">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                  onClick={() => selectMainPhoto(file)}
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="border border-input px-4 py-2 rounded-md"
        >
          {t('prev_button')}
        </button>
        <button
          onClick={onNext}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          {t('next_button')}
        </button>
      </div>
    </div>
  );
}; 