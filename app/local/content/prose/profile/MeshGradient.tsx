import Random from 'seedrandom';

// Generate a random hue from 0 - 360
const getColor = (random): number => {
    return Math.round(random() * 360);
};

const getPercent = (value: number, random): number => {
    return Math.round((random() * (value * 100)) % 100);
};

const getHashPercent = (
    value: number,
    hash: number,
    length: number
): number => {
    return Math.round(((hash / length) * (value * 100)) % 100);
};

const hexToHSL = (hex?: string): number | undefined => {
    if (!hex) return undefined;

    hex = hex.replace(/#/g, '');

    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((hex) => {
                return hex + hex;
            })
            .join('');
    }

    const result = /^([\da-f]{2})([\da-f]{2})([\da-f]{2})[\da-z]*$/i.exec(hex);

    if (!result) {
        return undefined;
    }

    let r = Number.parseInt(result[1], 16);
    let g = Number.parseInt(result[2], 16);
    let b = Number.parseInt(result[3], 16);

    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = (max + min) / 2;

    if (max == min) {
        h = 0;
    } else {
        const d = max - min;

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    h = Math.round(360 * h);

    return h;
};

const genColors = (length: number, initialHue: number): string[] => {
    return Array.from({ length }, (_, index) => {
        // analogous colors + complementary colors
        // https://uxplanet.org/how-to-use-a-split-complementary-color-scheme-in-design-a6c3f1e22644

        // base color
        if (index === 0) {
            return `hsl(${initialHue}, 100%, 74%)`;
        }

        // analogous colors
        if (index < length / 1.4) {
            return `hsl(${
                initialHue -
                30 * (1 - 2 * (index % 2)) * (index > 2 ? index / 2 : index)
            }, 100%, ${64 - index * (1 - 2 * (index % 2)) * 1.75}%)`;
        }

        // complementary colors
        return `hsl(${initialHue - 150 * (1 - 2 * (index % 2))}, 100%, ${
            66 - index * (1 - 2 * (index % 2)) * 1.25
        }%)`;
    });
};

const genGrad = (
    random,
    length: number,
    colors: string[],
    hash?: number
): string[] => {
    return Array.from({ length }, (_, index) => {
        return `radial-gradient(at ${
            hash
                ? getHashPercent(index, hash, length)
                : getPercent(index, random)
        }% ${
            hash
                ? getHashPercent(index * 10, hash, length)
                : getPercent(index * 10, random)
        }%, ${colors[index]} 0px, transparent 55%)\n`;
    });
};

const genStops = (
    random,
    length: number,
    baseColor?: number,
    hash?: number
) => {
    // get the color for the radial gradient
    const colors = genColors(length, baseColor ? baseColor : getColor(random));
    // generate the radial gradient
    const proprieties = genGrad(
        random,
        length,
        colors,
        hash ? hash : undefined
    );

    return [colors[0], proprieties.join(',')];
};

const generateMeshGradient = (
    length: number,
    baseColor?: string,
    hash?: number
) => {
    const { random } = Math;

    const [bgColor, bgImage] = genStops(
        random,
        length,
        hexToHSL(baseColor) ? hexToHSL(baseColor) : undefined,
        hash ? hash : undefined
    );

    return `background-color: ${bgColor}; background-image:${bgImage}`;
};

const generateJSXMeshGradient = (
    random,
    length: number,
    baseColor?: string,
    hash?: number
) => {
    const [bgColor, bgImage] = genStops(
        random,
        length,
        hexToHSL(baseColor) ? hexToHSL(baseColor) : undefined,
        hash ? hash : undefined
    );

    return { backgroundColor: bgColor, backgroundImage: bgImage };
};

export const generateMeshGradientFromName = (name: string) => {
    const random = Random.alea(name);
    const length = Math.round(random() * 5 + 2);

    return generateJSXMeshGradient(random, length);
};

export { generateMeshGradient as generateMeshGradient };
export { generateJSXMeshGradient as generateJSXMeshGradient };
