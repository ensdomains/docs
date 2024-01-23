import { FC } from 'react';

export const LabelField: FC<{
    label: string;
    setLabel: (_label: string) => void;
}> = ({ label, setLabel }) => {
    return (
        <div>
            <p>Label (name without ".eth"):</p>
            <div className="flex items-center gap-2">
                <input
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    className="input max-w-sm"
                    placeholder="test123"
                />
                <div>.eth</div>
            </div>
        </div>
    );
};
