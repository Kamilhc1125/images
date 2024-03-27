import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from './context';

const accessKey = import.meta.env.VITE_API_ACCESS_KEY;
const secretKey = import.meta.env.VITE_API_SECRET_KEY;

const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}`;

const Gallery = () => {

  const { searchTerm } = useGlobalContext();

  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      console.log(result.data);
      return result.data;
    }
  });

  if (response.isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading....</h4>
      </section>
    );
  };

  if (response.isError) {
    return (
      <section className='image-container'>
        <h4>There was an error....</h4>
      </section>
    );
  };

  const result = response.data.results;

  if (result.length < 1) {
    return (
      <section className='image-container'>
        <h4>There was an error....</h4>
      </section>
    );
  }

  return (
    <section className='image-container'>
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className='img'
          />
        )
      })}
    </section>
  )
}

export default Gallery;
