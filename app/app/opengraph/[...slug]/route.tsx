import { getPageBySlug } from 'data/get_page';
import { getAllPageSlugs } from 'data/get_pages';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';

import { getProfilePicture } from '@/utils/contributorHelper';
import { navigation } from '#/config/navigation';

// Route segment config
// export const runtime = 'nodejs';
// export const runtime = 'edge';
// export const dynamic = 'error';
// eslint-disable-next-line unicorn/prevent-abbreviations
// export const dynamicParams = false;
// export const revalidate = false;

// eslint-disable-next-line unicorn/prevent-abbreviations
// export async function generateStaticParams() {
//     const pages = ['a/b'];

//     return pages.map((slug) => ({
//         slug: slug.split('/'),
//     }));
// }

// export async function generateImageMetadata({
//     params,
// }: {
//     params: { slug: string };
// }) {
//     // const images = await getOGImages(params.id);
//     const images = [{ text: 'Other text' }, { text: 'O:' + params.slug }];

//     return images.map((image, index) => ({
//         id: index,
//         size: { width: 1600, height: 840 },
//         alt: image.text,
//         contentType: 'image/png',
//     }));
// }

// Font
// const interSemiBold = fetch(
//     new URL('public/Inter-SemiBold.ttf', import.meta.url)
// ).then((response) => response.arrayBuffer());

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
                            width="227"
                            height="100"
                            viewBox="0 0 227 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.6045 23.5283C13.54 21.7914 14.8903 20.3107 16.536 19.2168L44.156 0L15.856 46.6253C15.856 46.6253 13.3833 42.4619 12.4189 40.3552C11.2172 37.7064 10.6112 34.8281 10.6432 31.9213C10.6752 29.0147 11.3446 26.1501 12.6045 23.5283ZM1.20533 55.6918C1.51718 60.1506 2.78154 64.4915 4.91376 68.4238C7.04599 72.3564 9.99684 75.7893 13.5688 78.4933L44.1188 99.718C44.1188 99.718 25.0049 72.2726 8.88303 44.9625C7.25084 42.0771 6.15358 38.9226 5.6438 35.6497C5.41812 34.1677 5.41812 32.6601 5.6438 31.178C5.22343 31.9543 4.40745 33.5433 4.40745 33.5433C2.77276 36.8649 1.65945 40.4171 1.10642 44.0756C0.788106 47.9427 0.82121 51.8305 1.20533 55.6918ZM79.095 59.3872C78.1057 57.2808 75.6578 53.1171 75.6578 53.1171L47.4075 99.718L75.0273 80.5134C76.6731 79.4195 78.0234 77.939 78.959 76.2021C80.2188 73.5802 80.888 70.7156 80.9203 67.8092C80.9523 64.9024 80.3462 62.0238 79.1444 59.375L79.095 59.3872ZM90.3084 44.0384C89.9965 39.5799 88.7322 35.2387 86.6002 31.3064C84.4679 27.3741 81.517 23.9409 77.945 21.237L47.4444 0C47.4444 0 66.5459 27.4455 82.6804 54.7555C84.3081 57.6418 85.4011 60.7963 85.9072 64.0683C86.1328 65.5503 86.1328 67.0579 85.9072 68.5399C86.3276 67.7637 87.1435 66.1747 87.1435 66.1747C88.7783 62.853 89.8917 59.3009 90.4444 55.6424C90.767 51.7756 90.738 47.8878 90.3581 44.0262L90.3084 44.0384Z"
                                fill="url(#paint0_linear_1655_5073)"
                            />
                            <path
                                d="M140.968 70.7317V62.7256H122.122V52.6256H139.182V45.0506H122.122V35.0738H140.968V27.0677H113.624V70.7317H140.968Z"
                                fill="url(#paint1_linear_1655_5073)"
                            />
                            <path
                                d="M186.547 70.7317V27.0677H178.048V55.9512L159.881 27.0677H149.288V70.7317H157.787V39.7543L177.617 70.7317H186.547Z"
                                fill="url(#paint2_linear_1655_5073)"
                            />
                            <path
                                d="M226.238 37.4756C225.252 32.5488 221.188 26.1439 210.595 26.1439C202.343 26.1439 195.384 32.0561 195.384 39.8158C195.384 46.4055 199.879 50.9012 206.838 52.3177L212.935 53.5494C216.323 54.2268 218.232 56.1976 218.232 58.7226C218.232 61.8018 215.707 64.0805 211.149 64.0805C204.991 64.0805 201.973 60.2006 201.604 55.8896L193.721 57.9835C194.398 64.2037 199.51 71.6555 211.088 71.6555C221.249 71.6555 226.854 64.8811 226.854 58.1683C226.854 52.0098 222.604 46.8366 214.66 45.2969L208.563 44.1268C205.36 43.511 203.821 41.6018 203.821 39.2C203.821 36.3055 206.531 33.6573 210.657 33.6573C216.199 33.6573 218.17 37.414 218.601 39.8158L226.238 37.4756Z"
                                fill="url(#paint3_linear_1655_5073)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_1655_5073"
                                    x1="151.401"
                                    y1="111.536"
                                    x2="98.1697"
                                    y2="-100.776"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#44BCF0" />
                                    <stop
                                        offset="0.378795"
                                        stop-color="#7298F8"
                                    />
                                    <stop offset="1" stop-color="#A099FF" />
                                </linearGradient>
                                <linearGradient
                                    id="paint1_linear_1655_5073"
                                    x1="151.401"
                                    y1="111.536"
                                    x2="98.1697"
                                    y2="-100.776"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#44BCF0" />
                                    <stop
                                        offset="0.378795"
                                        stop-color="#7298F8"
                                    />
                                    <stop offset="1" stop-color="#A099FF" />
                                </linearGradient>
                                <linearGradient
                                    id="paint2_linear_1655_5073"
                                    x1="151.401"
                                    y1="111.536"
                                    x2="98.1697"
                                    y2="-100.776"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#44BCF0" />
                                    <stop
                                        offset="0.378795"
                                        stop-color="#7298F8"
                                    />
                                    <stop offset="1" stop-color="#A099FF" />
                                </linearGradient>
                                <linearGradient
                                    id="paint3_linear_1655_5073"
                                    x1="151.401"
                                    y1="111.536"
                                    x2="98.1697"
                                    y2="-100.776"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#44BCF0" />
                                    <stop
                                        offset="0.378795"
                                        stop-color="#7298F8"
                                    />
                                    <stop offset="1" stop-color="#A099FF" />
                                </linearGradient>
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
