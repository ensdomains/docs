import { FC } from 'react';

export const ResolverField: FC<{
    resolver: string;
    setResolver: (owner: string) => void;
}> = ({ resolver: owner, setResolver: setOwner }) => {
    return (
        <div>
            <label className="label" htmlFor="resolver">
                Resolver (address):
            </label>
            <div className="flex items-center gap-2">
                <input
                    value={owner}
                    onChange={(event) => setOwner(event.target.value)}
                    className="input"
                    id="resolver"
                    placeholder="0x225f137127d9067788314bc7fcc1f36746a3c3B5"
                />
            </div>
        </div>
    );
};
