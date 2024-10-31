import { getPageBySlug } from 'data/get_page';
import { getAllPageSlugs } from 'data/get_pages';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';

import { getProfilePicture } from '@/utils/contributorHelper';
import { navigation } from '#/config/navigation';

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    if (process.env.NODE_ENV !== 'production') return [];

    const pages = await getAllPageSlugs();

    // return [];

    // TODO: Uncomment
    return pages.map((slug) => ({
        slug: (slug + '.png').split('/'),
    }));
}

const fontScale = (length: number) => {
    // Max font size: 128
    const max = 100;
    // Min font size: 32
    const min = 32;

    // Max length: 30
    // Min length: 3

    return Math.max(
        min,
        Math.min(max, Math.round(max - (max - min) * (length / 40)))
    );
};

const satoshiBoldFont = readFile('public/fonts/sans-serif/Satoshi-Bold.otf');
const satoshiMediumFont = readFile(
    'public/fonts/sans-serif/Satoshi-Medium.otf'
);

// const satoshiFont = fetch(
//     new URL(, import.meta.url)
// ).then((response) => response.arrayBuffer());

// Image generation
export async function GET(request: NextRequest) {
    // ex: /opengraph/web/siwe.png
    const { pathname } = request.nextUrl;

    console.log('🖼️ -> ' + pathname);

    // ex web/siwe (remove final .png, and remove /opengraph/)
    const slug = pathname.slice(11, -4);

    const section = navigation.protocol.find((section) =>
        section.activePattern?.test('/' + slug)
    )?.name;

    const page = await getPageBySlug(slug);

    const [avatars, moreAvatars] = (() => {
        if (!page.pageProperties.meta?.contributors) return [[], 0];

        const v = [...page.pageProperties.meta.contributors].reverse();

        const s1 = v.slice(0, 5).reverse();

        // grab first 5 contributors
        return [s1, v.length - s1.length];
    })();

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#F6F6F6',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    padding: '80px',
                    fontFamily: 'Satoshi',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',

                        width: '100%',
                        height: '100%',
                        background: 'white',
                        padding: '90px 32px',
                        borderRadius: '2rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'rgb(82, 152, 255)',
                        }}
                    >
                        <svg
                            width="228"
                            height="100"
                            viewBox="0 0 228 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_1593_5439)">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M33.5223 15.077C33.1353 14.8069 32.6585 15.2675 32.9178 15.6608C37.2488 22.2296 51.6458 44.0856 53.6345 47.3665C53.9316 47.8566 54.2722 48.3959 54.6374 48.9741L54.6376 48.9743C56.6838 52.214 59.503 56.6776 59.7761 60.5819C59.8082 61.0412 60.4452 61.1344 60.6054 60.7025C60.8639 60.0058 61.139 59.1743 61.3954 58.2244C64.6324 46.2338 59.9313 33.51 49.7215 26.3838L33.5223 15.077ZM30.8586 15.647L11.4686 47.4617C11.3165 47.7112 10.9632 47.739 10.7746 47.5157C9.06758 45.4946 2.70804 36.8961 10.5773 29.0591C17.7581 21.9078 26.9043 16.809 30.294 15.0468C30.6786 14.8469 31.0837 15.2777 30.8586 15.647ZM29.7749 84.9234C30.1618 85.1935 30.6387 84.7328 30.3793 84.3395C26.0483 77.7707 11.6514 55.9147 9.6626 52.6338C9.36548 52.1437 9.02485 51.6044 8.65958 51.026C6.61335 47.7863 3.79411 43.3228 3.52101 39.4185C3.48889 38.9591 2.85192 38.8659 2.69168 39.2978C2.43327 39.9945 2.15815 40.826 1.90173 41.7759C-1.33524 53.7666 3.36584 66.4903 13.5756 73.6165L29.7749 84.9234ZM51.8301 52.5352L32.4401 84.35C32.215 84.7193 32.6201 85.1501 33.0047 84.9502C36.3944 83.1879 45.5407 78.0892 52.7214 70.9379C60.5906 63.1009 54.2311 54.5024 52.5241 52.4813C52.3355 52.258 51.9822 52.2858 51.8301 52.5352ZM120.059 30.0646C124.965 35.0469 127.436 42.6194 127.644 52.2092C127.652 52.5617 127.372 52.8539 127.019 52.8651L91.3473 53.9912C90.9863 54.0026 90.7034 54.3081 90.7281 54.668C91.2814 62.6987 95.4356 66.6848 102.812 66.452C109.036 66.2554 112.178 63.4409 113.155 58.5204C113.22 58.1945 113.511 57.9582 113.843 57.9769L126.267 58.6776C126.667 58.7001 126.951 59.0788 126.853 59.4668C124.091 70.3685 115.868 76.0354 103.128 76.4376C95.2505 76.6863 88.9092 74.3623 84.5367 70.3608C79.539 65.7732 76.9045 59.1926 76.6364 50.7199C76.381 42.6507 78.3857 35.7218 83.1843 30.8249C87.4906 26.3474 93.4767 23.8362 101.354 23.5875C109.332 23.3356 115.674 25.6596 120.059 30.0646ZM101.664 33.3714C97.5231 33.5021 94.6326 34.805 92.7936 37.3872C91.5579 39.0819 90.8383 41.1792 90.5561 43.6054C90.5115 43.9888 90.8238 44.3151 91.2101 44.3029L112.293 43.6373C112.676 43.6252 112.966 43.2859 112.906 42.9082C112.463 40.1042 111.57 37.7582 109.836 36.0414C107.853 34.0847 105.299 33.2566 101.664 33.3714ZM181.603 60.6285C182.912 71.7844 192.771 76.4548 204.577 76.4548C216.399 76.4548 227.11 72.62 227.11 60.5101C227.11 48.5948 216.068 46.1176 207.112 44.1082L206.901 44.0609C200.131 42.5472 196.494 41.3362 196.494 37.9051C196.494 34.3731 199.929 32.8593 204.072 32.8593C208.902 32.8593 212.162 35.1654 212.704 40.3067C212.745 40.6918 213.097 40.9763 213.479 40.9112L225.191 38.9164C225.531 38.8586 225.766 38.5412 225.717 38.2008C224.141 27.176 214.785 23.5751 203.87 23.5751C192.957 23.5751 183.156 27.9145 183.156 39.0152C183.156 49.4095 192.048 52.4369 201.748 54.758C209.73 56.6754 213.57 57.8863 213.57 61.2165C213.57 64.9504 210.64 67.0696 204.88 67.0696C199.449 67.0696 195.507 64.5589 195.021 59.002C194.988 58.6217 194.651 58.3318 194.271 58.3802L182.157 59.9267C181.812 59.9708 181.563 60.2833 181.603 60.6285ZM178.238 44.4256C178.238 37.8661 177.733 32.4167 173.691 28.3801C170.458 25.1508 166.719 23.6371 160.253 23.6371C154.151 23.6371 148.747 25.7272 145.905 31.1212C145.76 31.3957 145.298 31.2976 145.298 30.9874V25.4958C145.298 25.1381 145.008 24.8481 144.65 24.8481H131.902C131.544 24.8481 131.253 25.1381 131.253 25.4958V75.3664C131.253 75.7241 131.544 76.0141 131.902 76.0141H144.751C145.109 76.0141 145.399 75.7241 145.399 75.3664V47.7558C145.399 37.3616 150.451 34.435 154.796 34.435C157.828 34.435 159.545 34.7378 161.364 36.4533C163.587 38.5725 163.991 40.9945 163.991 45.6366V75.3664C163.991 75.7241 164.281 76.0141 164.64 76.0141H177.59C177.948 76.0141 178.238 75.7241 178.238 75.3664V44.4256Z"
                                    fill="#0080BC"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1593_5439">
                                    <rect
                                        width="226.22"
                                        height="100"
                                        fill="white"
                                        transform="translate(0.890137)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: fontScale(
                                    page.pageProperties.meta.title.length
                                ),
                                fontWeight: 830,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {page.pageProperties.meta.title}
                        </div>
                        {!!section && (
                            <div
                                style={{
                                    fontSize: 42,
                                    fontWeight: 500,
                                    color: '#9B9BA7',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {section}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '16px',
                            right: '16px',
                            display: 'flex',
                        }}
                    >
                        {avatars.map((key, index) => (
                            <div
                                key={key}
                                style={{
                                    display: 'flex',
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: 'lightblue',
                                    marginLeft: index > 0 ? '-16px' : '0',
                                    border: '1px solid #E8E8E8',
                                }}
                            >
                                <img
                                    src={getProfilePicture(key, 'jpg')}
                                    height={42}
                                    width={42}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                        ))}
                        {moreAvatars > 0 && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: '#EEF5FF',
                                    color: '#3889FF',
                                    marginLeft: '-16px',
                                    fontWeight: 700,
                                }}
                            >
                                + {moreAvatars}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '16px',
                            left: '16px',
                            background: '#EEF5FF',
                            color: '#3889FF',
                            padding: '6px 16px',
                            borderRadius: '30px',
                            lineHeight: '30px',
                            fontSize: '30px',
                            fontWeight: 700,
                        }}
                    >
                        Docs
                    </div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // ...size,
            width: 1200,
            height: 630,
            emoji: 'twemoji',
            fonts: [
                {
                    name: 'Satoshi',
                    data: await satoshiMediumFont,
                    style: 'normal',
                    weight: 500,
                },
                {
                    name: 'Satoshi',
                    data: await satoshiBoldFont,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    );
}
