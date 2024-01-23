export type MatchesPosition = { start: number; length: number }[];

export type SearchEntry = {
    slug: string;
    title: string;
    description: string;
    emoji: string;
    _formatted: {
        content: string;
        slug: string;
        title: string;
        description: string;
    };
    _matchesPosition: {
        content: MatchesPosition;
        slug: MatchesPosition;
        title: MatchesPosition;
        description: MatchesPosition;
    };
};

export type SearchResult = {
    estimatedTotalHits: number;
    hits: SearchEntry[];
    limit: number;
    offset: number;
    processingTimeMs: number;
};
