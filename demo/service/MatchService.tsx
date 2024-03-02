import { Demo } from '@/types';

export const MatchService = {
    getMatches() {
        return fetch('/demo/data/matches.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Match[]);
    }
};