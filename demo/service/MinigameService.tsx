import { Demo } from '@/types';

export const MinigameService = {
    getMinigames() {
        return fetch('/demo/data/minigames.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Minigame[]);
    }
};
