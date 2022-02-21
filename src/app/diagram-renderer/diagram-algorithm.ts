import { DiagramOptions } from "./diagram-options";

/**
 * Gets the paths to be displayed in the diagram.
 * @param options The diagram options.
 * @returns The set of paths to be displayed in the diagram.
 */
export function getDiagram(options: DiagramOptions): number[][] {
    if (options.modulus <= 1 || options.multiplier <= 1) {
        return [];
    }

    let remaining = new Array(options.modulus - 1).fill(0).map((_, i) => i + 1);
    const result: number[][] = [];
    const seen = new Set<number>();
    while (remaining.length > 0) {
        seen.add(remaining[0]);
        const path = [...getDiagramPath(remaining[0], options)];
        path.forEach(v => seen.add(v));
        result.push(path);
        remaining = remaining.filter(value => !seen.has(value));
    }

    return result;
}

/**
 * Gets a single path in the diagram starting at the given number.
 * @param start The starting value.
 * @param options The diagram options.
 * @returns The numbers that make up the path starting at the given number.
 */
export function* getDiagramPath(start: number, options: DiagramOptions): Iterable<number> {
    let current = digitalRoot(start, options.modulus);
    yield current;

    const seen = new Set<number>();

    // We can have at most `modulus` entries in the path (but likely less)
    for (let i = 0; i < options.modulus; i++) {
        current = digitalRoot(current * options.multiplier, options.modulus);
        if (seen.has(current)) {
            // If we encounter a value we've seen before, then we are guaranteed
            // to continue obtaining values we've seen, so we can return immediately. 
            return;
        }

        seen.add(current);
        yield current;
    }
}

/**
 * Gets the digital root for the value in the given base.
 * @param value The value to take the digital root of.
 * @param base The base in which numbers are to be represented.
 * @returns The digital root for the value when represented in the given base.
 */
function digitalRoot(value: number, base: number): number {
    // Upon closer inspection, the digital root is just modulo in disguise.
    // The only difference is that we return the base value instead of zero
    // because that makes more sense for the digital root.
    const mod = value % base;
    return mod === 0 ? base : mod;
}