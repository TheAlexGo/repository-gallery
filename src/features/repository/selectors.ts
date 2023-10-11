import type { IRepository } from '@types';

import type { RootState } from '@store';

export const repositoryListSelector = (state: RootState): IRepository[] => state.repository.list;
export const activeRepositorySelector = (state: RootState): IRepository | null => state.repository.activeRepository;
