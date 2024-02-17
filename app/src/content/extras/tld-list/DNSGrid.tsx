export const DNSGrid = () => {
    return (
        <div className="card1">
            <div className="not-prose flex flex-wrap gap-3 p-4 pl-6 text-ens-light-blue-500">
                {[
                    '.com',
                    '.xyz',
                    '.nl',
                    '.net',
                    '.org',
                    '.shop',
                    '.photos',
                    '.pizza',
                    '.cash',
                    '.money',
                    '.news',
                    '.info',
                    '.gold',
                    '.domains',
                    '.social',
                    '.de',
                    '.city',
                    '.lol',
                    '.rip',
                    '.company',
                    '.es',
                    '.network',
                    '.me',
                    '.us',
                    '.id',
                    '.fr',
                    '.space',
                    '.ninja',
                    '.tools',
                    '.wtf',
                    '.capital',
                    '.finance',
                    '.vision',
                    '.limo',
                    '.link',
                    '.uk',
                    '.world',
                    '.dev',
                    '.day',
                    '.fyi',
                    '.cool',
                ].map((a) => (
                    <span className="cursor-pointer hover:drop-shadow" key={a}>
                        {a}
                    </span>
                ))}
                <span className="text-blue-500/50">
                    and any other DNSSEC-compatible domain...
                </span>
            </div>
        </div>
    );
};
