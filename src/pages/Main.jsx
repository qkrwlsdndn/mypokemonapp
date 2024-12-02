import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonData } from '../RTK/pokemonSlice';

const Main = () => {
  const dispatch = useDispatch();
  const { pokemonList, status } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemonData());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load data.</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id} className="border p-4 rounded shadow">
          <img src={pokemon.imageFront} alt={pokemon.name} />
          <h3 className="text-lg font-bold">{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Main;
