import { getPageBySlug } from 'data/get_page';
import { getAllPageSlugs } from 'data/get_pages';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';

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

const satoshiFont = readFile('public/fonts/sans-serif/Satoshi-Bold.otf');

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

    const page = await getPageBySlug(slug);

    const [[avatars, moreAvatars], [authors, moreAuthors]] = (() => {
        if (!page.pageProperties.meta?.contributors)
            return [
                [[], 0],
                [[], 0],
            ];

        const v = [...page.pageProperties.meta.contributors].reverse();
        const s1 = v.slice(0, 5).reverse();
        const s2 = v.slice(0, 3);

        // grab first 5 contributors
        return [
            [s1, v.length - s1.length],
            [s2, v.length - s2.length],
        ];
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
                    fontFamily: 'Satoshi',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        background:
                            'radial-gradient(50% 50% at 50% 50%, rgba(82, 152, 255, 0.163) 0%, rgba(255, 255, 255, 0) 100%)',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '80px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            background: 'white',
                            padding: '80px',
                            // border: '3px solid #c0c0c0',
                            borderRadius: '2rem',
                            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.17)',
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
                                style={{ width: '6rem', height: '6rem' }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="328"
                                height="328"
                                viewBox="0 0 328 328"
                                fill="none"
                            >
                                <mask
                                    id="mask0_13_80"
                                    maskUnits="userSpaceOnUse"
                                    x="17"
                                    y="0"
                                    width="295"
                                    height="328"
                                >
                                    <path
                                        d="M312 0H17V328H312V0Z"
                                        fill="white"
                                    />
                                </mask>
                                <g mask="url(#mask0_13_80)">
                                    <path
                                        d="M55.423 77.1727C58.4917 71.4759 62.9204 66.6192 68.3185 63.0311L158.912 0L66.088 152.931C66.088 152.931 57.9776 139.275 54.8145 132.365C50.8729 123.677 48.885 114.236 48.99 104.702C49.0951 95.1681 51.2908 85.7724 55.423 77.1727ZM18.0338 182.669C19.0567 197.294 23.2038 211.532 30.1975 224.43C37.1912 237.329 46.87 248.589 58.5859 257.458L158.79 327.075C158.79 327.075 96.0965 237.054 43.2167 147.477C37.8631 138.013 34.2641 127.666 32.592 116.931C31.8518 112.07 31.8518 107.125 32.592 102.264C31.2132 104.81 28.5368 110.022 28.5368 110.022C23.175 120.917 19.5233 132.568 17.7094 144.568C16.6653 157.252 16.7739 170.004 18.0338 182.669ZM273.512 194.79C270.267 187.881 262.238 174.224 262.238 174.224L169.577 327.075L260.17 264.084C265.568 260.496 269.997 255.64 273.066 249.943C277.198 241.343 279.393 231.947 279.499 222.414C279.604 212.88 277.616 203.438 273.674 194.75L273.512 194.79ZM310.292 144.446C309.269 129.822 305.122 115.583 298.129 102.685C291.135 89.7869 281.456 78.5263 269.74 69.6575L169.698 0C169.698 0 232.351 90.0213 285.272 179.598C290.611 189.065 294.196 199.412 295.856 210.144C296.596 215.005 296.596 219.95 295.856 224.811C297.235 222.265 299.911 217.053 299.911 217.053C305.273 206.158 308.925 194.507 310.738 182.507C311.796 169.824 311.701 157.072 310.455 144.406L310.292 144.446Z"
                                        fill="url(#paint0_linear_13_80)"
                                    />
                                </g>
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_13_80"
                                        x1="213.139"
                                        y1="365.839"
                                        x2="-120.913"
                                        y2="-163.517"
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
                            {/* <img
                        src={''}
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                        }}
                    /> */}
                        </div>
                        <div
                            style={{
                                fontSize: fontScale(
                                    page.pageProperties.meta.title.length
                                ),
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flexGrow: 1,
                            }}
                        >
                            {page.pageProperties.meta.title}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.75rem',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    paddingTop: '1rem',
                                    paddingBottom: '1rem',
                                }}
                            >
                                {avatars.map((key, index) => (
                                    <div
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            width: '3.5rem',
                                            height: '3.5rem',
                                            borderRadius: '50%',
                                            background: 'lightblue',
                                            marginLeft:
                                                index > 0 ? '-1.5rem' : '0',
                                        }}
                                    >
                                        <img
                                            src={
                                                'https://github.com/' +
                                                key +
                                                '.png'
                                            }
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
                                            width: '3.5rem',
                                            height: '3.5rem',
                                            borderRadius: '50%',
                                            background: 'lightblue',
                                            marginLeft: '-1.5rem',
                                        }}
                                    >
                                        + {moreAvatars}
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: 32,
                                }}
                            >
                                {authors.join(', ')}
                                {moreAuthors > 0 && ', ...'}
                            </div>
                        </div>
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
                    data: await satoshiFont,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
}
