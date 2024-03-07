import { ENStateProfile } from './profile';

const ENSTATE_PUBLIC_INSTANCE = 'https://enstate.rs';

export const rawFetchEnstateProfile = async (
    name: string,
    instance: string = ENSTATE_PUBLIC_INSTANCE
): Promise<ENStateProfile> => {
    const request = await fetch(instance + '/n/' + name);

    return request.json() as Promise<ENStateProfile>;
};

export const swrFetchEnstateProfile = (instance?: string) => {
    return async ([_enstate, name]: ['enstate', string]) =>
        rawFetchEnstateProfile(name, instance);
};
