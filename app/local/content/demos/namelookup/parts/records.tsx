import { FC, Fragment } from 'react';
import {
    FaClock,
    FaDiscord,
    FaGithub,
    FaGlobe,
    FaTelegram,
    FaTwitter,
} from 'react-icons/fa';

import { RecordType } from '../logic/profile';
const recordIcons = {
    'com.discord': <FaDiscord />,
    'com.github': <FaGithub />,
    'com.twitter': <FaTwitter />,
    'org.telegram': <FaTelegram />,
    url: <FaGlobe />,
    timezone: <FaClock />,
} as const;

export const Records: FC<{ records?: Record<RecordType, string> }> = ({
    records,
}) => {
    if (!records) return <></>;

    if (Object.keys(records).length === 0) return <></>;

    return (
        <div
            className="grid w-full gap-x-3"
            style={{ gridTemplateColumns: 'auto 1fr' }}
        >
            {Object.keys(records)
                .sort((a, b) => b.length - a.length)
                .map((record) => (
                    <Fragment key={record}>
                        <div className="py-1">
                            {recordIcons[record] ? (
                                <div className="flex items-center gap-0.5">
                                    <div className="flex size-4 items-center justify-center">
                                        {typeof recordIcons[record] ===
                                        'string' ? (
                                            <img
                                                src={recordIcons[record]}
                                                alt={record}
                                                className="aspect-square w-full rounded-full"
                                            />
                                        ) : (
                                            recordIcons[record]
                                        )}
                                    </div>
                                    <div className="font-bold leading-none">
                                        {record}
                                    </div>
                                </div>
                            ) : (
                                <div className="font-bold leading-none">
                                    {record}
                                </div>
                            )}
                        </div>
                        <div className="truncate leading-none">
                            {records[record]}
                        </div>
                    </Fragment>
                ))}
        </div>
    );
};
