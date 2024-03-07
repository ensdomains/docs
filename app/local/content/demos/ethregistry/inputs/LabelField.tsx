import { FC } from 'react';

export const LabelField: FC<{
    label: string;
    setLabel: (_label: string) => void;
}> = ({ label, setLabel }) => {
    const id = 'label'; // TODO:

    return (
        <div>
            <label
                htmlFor={id + 'label'}
                className="px-2 font-bold text-ens-light-text-secondary"
            >
                Label (name without ".eth"):
            </label>
            <div className="flex items-center gap-2">
                <input
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    className="input"
                    placeholder="test123"
                    name="label"
                />
                <div>.eth</div>
            </div>
        </div>
    );
};
