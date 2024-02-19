export const InfoIcon = (properties) => {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" {...properties}>
            <circle cx="8" cy="8" r="8" strokeWidth="0" />
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.75 7.75h1.5v3.5"
            />
            <circle cx="8" cy="4" r=".5" fill="none" />
        </svg>
    );
};
