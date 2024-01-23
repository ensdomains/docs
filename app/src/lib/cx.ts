export const cxWithTheme = (all, light, dark) => {
    return [
        all,
        light,
        dark
            .split(' ')
            .map((a) => `dark:${a}`)
            .join(' '),
    ].join(' ');
};

export const cx = (...all) => {
    return all.filter((f) => !!f).join(' ');
};

// cx(
//     'rounded-md px-4 py-2 border-2',
//     'text-black bg-white border-black',
//     'text-white bg-black border-white'
// );
