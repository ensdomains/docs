export const GITHUB_REGEX = /^[\da-z](?:[\da-z]|-(?=[\da-z])){0,38}$/i;
export const ENS_REGEX = /^([\da-z]+(-[\da-z]+)*\.)+[a-z]{2,}$/i;

export const getUsernameType = (
    username: string
): 'ens' | 'github' | 'unknown' => {
    if (ENS_REGEX.test(username)) {
        return 'ens';
    }

    if (GITHUB_REGEX.test(username)) {
        return 'github';
    }

    return 'unknown';
};

export const getProfilePicture = (username: string, format: 'webp' | 'jpg') => {
    const type = getUsernameType(username);

    if (type === 'ens') {
        return `https://avatarservice.xyz/64/${username}.${format}`;
    }

    if (type === 'github') {
        return `https://github.com/${username}.png?size=64`;
    }
};

export const getLinkHref = (username: string) => {
    const type = getUsernameType(username);

    if (type === 'ens') {
        return `https://ens.page/${username}?ref=ens-docs`;
    }

    if (type === 'github') {
        return `https://github.com/${username}?ref=ens-docs`;
    }

    return '#';
};
