import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();

  return <p>Pokemon Detail for ID: {id}</p>;
};

export default Detail;
