import { createReducer } from '@reduxjs/toolkit';

interface InitialState {}

const initialState = (): InitialState => ({});

export default createReducer(initialState(), (builder) => {});
