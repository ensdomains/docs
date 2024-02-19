import { FC } from 'react';

import { Button } from '@/components/Button';

export const DurationField: FC<{
    duration: number;
    setDuration: (_duration: number) => void;
}> = ({ duration, setDuration }) => {
    const id = 'duration';

    return (
        <div>
            <label
                htmlFor={id + 'duration'}
                className="px-2 font-bold text-ens-light-text-secondary"
            >
                Duration (in seconds)
            </label>
            <div className="flex items-center gap-2">
                {(
                    [
                        [60 * 60 * 24 * 30, '1 month'],
                        [60 * 60 * 24 * 365, '1 year'],
                        [60 * 60 * 24 * 365 * 2, '2 years'],
                    ] as [number, string][]
                ).map(([time, name]) => (
                    <Button
                        key={time}
                        variant={duration === time ? 'primary' : 'secondary'}
                        onClick={() => {
                            setDuration(time);
                        }}
                    >
                        <span>{name}</span>
                    </Button>
                ))}
                <input
                    value={duration}
                    onChange={(event) => {
                        try {
                            setDuration(Number(event.target.value));
                        } catch (error) {
                            event.preventDefault();
                            console.log(error);
                        }
                    }}
                    className="input max-w-sm"
                    placeholder="31536000"
                />
            </div>
        </div>
    );
};
