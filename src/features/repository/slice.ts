import { createSlice } from '@reduxjs/toolkit';

import type { IRepository } from '@types';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface RepositoryState {
    list: IRepository[];
    activeRepository: IRepository | null;
}

const initialState: RepositoryState = {
    list: [],
    activeRepository: null,
};

export const repositorySlice = createSlice({
    name: 'repository',
    initialState,
    reducers: {
        init: (state, { payload }: PayloadAction<IRepository[]>) => ({
            ...state,
            list: payload,
        }),
        setActiveRepository: (state, { payload }: PayloadAction<IRepository | null>) => ({
            ...state,
            activeRepository: payload,
        }),
    },
});

export const { init, setActiveRepository } = repositorySlice.actions;
export default repositorySlice.reducer;
