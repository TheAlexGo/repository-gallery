import { Octokit } from 'octokit';

import type { IRepository } from '@types';

import type { Signal } from '@octokit/types/dist-types/Signal';

const REPOSITORIES_PER_PAGE = 30;

export interface IOwner {
    login: string;
}

export interface IRepositoryResponse {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    owner: IOwner | null;
    stargazers_count: number;
    forks_count: number;
    topics?: string[];
}

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export const repositoryConvert = (data: IRepositoryResponse): IRepository => ({
    id: data.id,
    title: data.name,
    author: data.owner?.login || null,
    description: data.description,
    link: data.homepage,
    tags: data.topics || [],
    starsCount: data.stargazers_count,
    forksCount: data.forks_count,
});

/**
 * Получаем список репозиториев
 * @return {Promise<IRepositoryResponse[]>} список репозиториев
 */
export const getRepositories = async (signal: Signal): Promise<IRepository[]> =>
    (
        await octokit.request('GET /search/repositories', {
            q: 'stars:>1 topic:javascript',
            sort: 'stars',
            per_page: REPOSITORIES_PER_PAGE,
            request: {
                signal,
            },
        })
    ).data.items.map(repositoryConvert);
