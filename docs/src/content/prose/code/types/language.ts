export type LanguageSettings<LanguageTypes extends string = string> = {
    name: string;
    icon?: string;
    language?: string;
    fallback?: LanguageTypes[];
};

export const configureLanguages = <K extends string, V extends string = K>(
    preset: Record<K, LanguageSettings<V>>
) => {
    return preset as Record<K, LanguageSettings<V>>;
};
