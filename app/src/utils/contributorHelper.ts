export const getUsernameType = (
    username: string
): 'ens' | 'github' | 'unknown' => {
    console.log(username);

    const github = /^[\da-z](?:[\da-z]|-(?=[\da-z])){0,38}$/i;
    const ens_domain = /^([\da-z]+(-[\da-z]+)*\.)+[a-z]{2,}$/i;

    if (ens_domain.test(username)) {
        return 'ens';
    }

    if (github.test(username)) {
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
