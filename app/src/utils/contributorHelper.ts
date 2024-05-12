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

export const getProfilePicture = (username: string) => {
    const type = getUsernameType(username);

    if (type === 'ens') {
        return `https://avatarservice.xyz/64/${username}.webp`;
    }

    if (type === 'github') {
        return `https://github.com/${username}.png?size=100`;
    }
};

export const getLinkHref = (username: string) => {
    const type = getUsernameType(username);

    if (type === 'ens') {
        // Contenthash support soon™
        return `https://ens.page/${username}?utm_campaign=ens-docs`;
    }

    if (type === 'github') {
        return `https://github.com/${username}`;
    }

    return '#';
};
