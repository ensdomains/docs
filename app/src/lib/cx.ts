export const cx = (...all) => {
    return all.filter((f) => !!f).join(' ');
};
