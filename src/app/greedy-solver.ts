export class GreedySolver {
  solve(
    neededResources: number[][],
    availableResources: number[],
    pricesPerUnit: number[]
  ): number[] {
    const result = new Array(pricesPerUnit.length).fill(0);
    const rows = neededResources.length;

    const sortedPrices = pricesPerUnit
      .map((p, index) => ({ price: p, index: index }))
      .sort((p1, p2) => p2.price - p1.price);

    for (const priceData of sortedPrices) {
      const col = priceData.index;

      let minPacksCount = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < rows; i++) {
        const intNumberOfPacks = Math.floor(
          availableResources[i] / neededResources[i][col]
        );
        minPacksCount = Math.min(intNumberOfPacks, minPacksCount);
      }

      for (let i = 0; i < rows; i++) {
        availableResources[i] -= neededResources[i][col] * minPacksCount;
      }

      result[col] = minPacksCount;
    }

    return result;
  }
}
