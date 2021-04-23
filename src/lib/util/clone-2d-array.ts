export function clone2DArray(currentArray: number[][]): number[][] {
    const clonedArray: number[][] = [];
    currentArray.forEach((_, index) => {
        clonedArray.push(
            Object.assign([], currentArray[index])
        );
    });
    return clonedArray;
}