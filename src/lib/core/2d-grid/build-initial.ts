export function build2DGrid(x: number, y: number) {

    if (x === 0 || y === 0) {
        return [];
    }

    return Array(y).fill(null).map(_ => Array(x).fill(0));
}