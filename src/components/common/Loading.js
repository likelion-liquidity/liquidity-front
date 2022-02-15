import React from 'react';
import { HeartSpinner } from 'react-spinners-kit';

const Loading = ({ loading, size = 30, color = '#686769' }) => {
  return <HeartSpinner size={size} color={color} loading={loading} />;
};

export default Loading;
