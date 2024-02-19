import { LanguagePresets } from '@/config/languages';

import { LanguageSettings } from './types/language';

export const getLanguage = (
    preset: string
): LanguageSettings<any> | undefined => {
    for (const [key, value] of Object.entries(LanguagePresets)) {
        if (key == preset || value['language'] === preset) {
            return value as LanguageSettings<any>;
        }
    }

    return undefined;
};

const toMax = (a: number, b: number) => (a == -1 ? 0 : b - a);

export const gradeAB = (a, b, preset, fallback_preset) => {
    if (a === preset) {
        return -1;
    }

    if (b === preset) {
        return 1;
    }

    const a_has_fallback = fallback_preset.indexOf(a);
    const b_has_fallback = fallback_preset.indexOf(b);

    console.log(a_has_fallback, b_has_fallback);

    if (a_has_fallback != 0 || b_has_fallback != 0) {
        return toMax(a_has_fallback, fallback_preset.length) >
            toMax(b_has_fallback, fallback_preset.length)
            ? -1
            : 1;
    }

    return 0;
};

/**
 * Sorts the languages array by
 * 1. Exact match of preset name and preferred preset
 * 2. Instances where the preset is a fallback of the preferred preset
 * 3. Instances where the preferred preset is a fallback of the preset
 */
export const sortLanguagesByPreset = (languages: string[], preset: string) => {
    console.log('Sorting snippets by ' + preset);

    const preferred_preset = getLanguage(preset);
    const fallback_preset = preferred_preset?.fallback ?? [];

    let best_match = languages.at(0);

    for (let index = 1; index < languages.length; index++) {
        const a = languages.at(index);
        const grade = gradeAB(a, best_match, preset, fallback_preset);

        if (grade == -1) {
            best_match = a;
        }
    }

    return best_match;
};
