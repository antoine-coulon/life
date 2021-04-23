export function isPositiveFiniteInteger(x: number): boolean {
    return Number.isFinite(x) && x >= 0 && Number.isInteger(x);
}