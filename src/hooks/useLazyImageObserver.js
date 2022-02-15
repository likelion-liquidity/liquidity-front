import { useEffect, useState, useRef } from 'react';

export function useLazyImageObserver({ src }) {
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef(null);

  useEffect(() => {
    let observer = null;
    if (imageRef && !imageSrc) {
      const option = {
        threshold: 0.5
      };
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(imageRef.current);
        }
      }, option);
      observer.observe(imageRef.current);
    }
    return () => observer && observer.disconnect();
  }, [imageRef, imageSrc, src]);

  return { imageSrc, imageRef };
}
