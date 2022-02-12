import React from 'react';
import { useLazyImageObserver } from 'hooks/useLazyImageObserver';

const LazyImage = React.memo(({ src, alt, customStyle }) => {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });
  return <img src={imageSrc} alt={alt} ref={imageRef} style={customStyle} />;
});

export default LazyImage;
