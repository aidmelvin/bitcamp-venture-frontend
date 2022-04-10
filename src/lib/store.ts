import create from "zustand";
import { API_JWT, User } from "./model/Auth";

interface AuthState {
    jwt?: API_JWT;
    user?: User;
    setUser: (newUser: User) => void;
    setJwt: (newJwt: API_JWT) => void;
}

export const useAuthStore = create<AuthState>(set => ({
    jwt: undefined,
    user: undefined,
    setUser: (newUser) => set(state => ({ ...state, user: newUser })),
    setJwt: (newJwt) => set(state => ({ ...state, jwt: newJwt }))
}));

interface EventState {
    likes: Set<number>;
    addLike: (id: number) => void;
    removeLike: (id: number) => void;
    toggleLike: (id: number) => void;
}

export const useEventStore = create<EventState>(set => ({
    likes: new Set(),
    addLike: (id) => set(state => {
        const { likes } = state;
        likes.add(id);
    }),
    removeLike: (id) => set(state => {
        const { likes } = state;
        likes.delete(id);
    }),
    toggleLike: (id) => set(state => {
        let { likes } = state;
        if (likes.has(id)) {
            likes.delete(id);
        } else {
            likes.add(id);
        }
        return { ...state, likes }
    })
}))