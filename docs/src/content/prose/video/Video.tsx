'use client';
import { useState } from 'react';

/* eslint-disable jsx-a11y/media-has-caption */
export const VideoComponent = ({ src }) => {
    const [videoUnavailable, setVideoUnavailable] = useState(false);

    // const v = useRef<HTMLVideoElement>();
    // const [muted, setMuted] = useState(true);
    // const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

    // useEffect(() => {
    //     if (v.current && !hasAutoPlayed) {
    //         v.current.addEventListener('play', () => {
    //             setTimeout(() => {
    //                 setHasAutoPlayed(true);
    //                 setMuted(false);
    //             }, 100);
    //         });
    //     }
    // }, [v]);

    if (videoUnavailable) {
        return (
            <div className="mb-4 flex aspect-video w-full items-center justify-center rounded-lg border bg-gradient-to-br from-slate-800 to-slate-600 text-2xl font-bold text-white shadow-sm">
                <div>SoonTM</div>
            </div>
        );
    }

    return (
        <video
            autoPlay
            crossOrigin="anonymous"
            width="full"
            className="aspect-video w-full rounded-lg shadow-md"
            controls
            muted
            // ref={v}
            // muted={muted}
            onError={(_) => {
                setVideoUnavailable(true);
            }}
            onLoad={() => {
                setVideoUnavailable(false);
            }}
            onAbort={() => {
                setVideoUnavailable(true);
            }}
            onInvalid={() => {
                setVideoUnavailable(true);
            }}
        >
            <source src={src + '.mp4'} type="video/mp4" />
            <source src={src + '.webm'} type="video/webm" />
            <source src={src + '.mkv'} type="video/mkv" />
            Your browser does not support the video tag.
        </video>
    );
};
