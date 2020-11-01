export interface SolveStep {
    workIndex: number;
    count: number;
    totalPrice: number;
    availableResourcesAfterStep: number[];
}

export class SolveResult {
    steps: SolveStep[] = [];
    workCounts: number[] = [];

    public getTotalRevenue(): number {
        return this.steps.reduce((sum, step) => sum + step.totalPrice, 0);
    }
}
