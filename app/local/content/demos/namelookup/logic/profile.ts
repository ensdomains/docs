export type SuggestedRecords =
    | 'url'
    | 'mail'
    | 'name'
    | 'email'
    | 'header'
    | 'avatar'
    | 'location'
    | 'timezone'
    | 'language'
    | 'pronouns'
    | 'org.matrix'
    | 'io.keybase'
    | 'com.twitter'
    | 'description'
    | 'com.discord'
    | 'org.telegram'
    | 'com.linkedin'
    | 'social.bluesky'
    | 'social.mastadon'
    | 'network.dm3.profile'
    | 'network.dm3.deliveryService';

export type RecordType = SuggestedRecords | (string & {});

export type ENStateProfile = {
    name: string;
    address: string; // address
    avatar: string; // url
    display: string; // ens name
    records: Record<RecordType, string>;
    chains: Record<string, string>;
    fresh: number; // timestamp
    resolver: string; // address of resolver
    errors: Record<string, string>;
};
