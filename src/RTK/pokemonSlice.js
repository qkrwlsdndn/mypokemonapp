
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonData = createAsyncThunk('pokemon/fetchData', async () => {
  const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);
  const responses = await Promise.all(
    pokemonIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
    )
  );
  return responses.map((data) => ({
    id: data.id,
    name: data.name,
    imageFront: data.sprites.front_default,
    imageBack: data.sprites.back_default,
    description: `Details about ${data.name}`,
  }));
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
