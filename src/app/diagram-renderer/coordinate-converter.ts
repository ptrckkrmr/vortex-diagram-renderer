export interface Point {
    x: number;
    y: number;
}

export function diagramToCoordinates(diagram: number[][], modulus: number): Point[][] {
    return diagram.map(path => path.map(value => valueToCoordinates(value, modulus)));
}

export function getCoordinatePoints(modulus: number): Point[] {
    return new Array(modulus).fill(0).map((_, i) => valueToCoordinates(i, modulus));
}

export function valueToCoordinates(value: number, modulus: number): Point {
    const angle = 2 * Math.PI * value / modulus - (Math.PI / 2);
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
}
