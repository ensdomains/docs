import { FiChevronRight } from 'react-icons/fi';

type Properties = {
    title: string;
    description: string;
    domain?: string;
    link: string;
    logo: string;
    bgColor: string;
    fgColor: string;
};

export const LinkCard = ({
    title,
    description,
    domain,
    link,
    logo,
    bgColor,
    fgColor,
}: Properties) => {
    return (
        <a
            href={link}
            className="card not-prose !m-0 flex w-full flex-col p-2 px-4 pb-4 hover:outline focus:outline focus:outline-4"
            style={{
                borderColor: bgColor,
                outlineColor: fgColor,
                background: `${bgColor}`,
                color: fgColor,
            }}
            target="_blank"
            rel="nofollow"
        >
            <div className="mb-2 flex justify-between">
                <div className="flex aspect-square w-8 items-center">
                    <img src={logo} alt={title} className="w-full" />
                </div>
                {domain && (
                    <div
                        className="my-auto size-fit px-2 text-xs"
                        style={{ background: fgColor, color: bgColor }}
                    >
                        {domain}
                    </div>
                )}
            </div>
            <div className="font-bold">{title}</div>
            <div className="leading-5">{description}</div>
            <div className="flex grow items-end justify-end text-right">
                <div className="flex items-center">
                    read more <FiChevronRight />
                </div>
            </div>
        </a>
    );
};
