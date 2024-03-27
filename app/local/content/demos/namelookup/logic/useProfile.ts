import useSWR from 'swr';

import { swrFetchEnstateProfile } from './fetch';

export type UseProfileParameters = {
    /**
     * The name of the profile to fetch.
     * @example 'luc.eth'
     */
    name: string;
    /**
     * URL of the enstate instance to use.
     * WARNING, the default instance is provided as is, please use it respectfully.
     * @default https://enstate.rs
     */
    instance?: string;
};

// TODO: Naive approach, doesn't support extended character set
const isValidDomain = /^([\da-z-]{1,63}\.)+[\da-z-]{1,63}$/i;

const isValidAddress = /^0x[\da-f]{40}$/i;

export const useProfile = ({ name, instance }: UseProfileParameters) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        isValidDomain.test(name) || isValidAddress.test(name)
            ? ['enstate', name]
            : undefined,
        swrFetchEnstateProfile(instance)
    );

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
    };
};
