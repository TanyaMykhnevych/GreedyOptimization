import { Component, ViewChild } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { GreedySolver } from './greedy-solver';
import { SolveResult } from './solve-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private sample3x3: number[][] = [
    [40, 44, 36, 500],
    [12, 16, 2, 240],
    [8, 2, 19, 159],
    [28, 31, 26, 0]
  ];

  private sample7x7: number[][] = [
    [40, 44, 36, 37, 43, 22, 38, 500],
    [12, 16, 2, 14, 22, 3, 20, 240],
    [8, 2, 19, 13, 13, 5, 10, 159],
    [28, 31, 26, 27, 33, 15, 26, 0]
  ];

  private sample15x15: number[][] = [
    [40, 44, 36, 37, 43, 22, 38, 45, 39, 34, 35, 29, 31, 41, 27, 500],
    [12, 16, 2, 14, 22, 3, 20, 25, 19, 13, 6, 13, 5, 18, 15, 240],
    [8, 2, 19, 13, 13, 5, 10, 22, 25, 8, 6, 10, 12, 9, 12, 159],
    [28, 31, 26, 27, 33, 15, 26, 37, 30, 27, 25, 28, 28, 29, 26, 0]
  ];

  @ViewChild(TableComponent, { static: true }) public table: TableComponent;

  constructor() { }

  public data = [
    [1, 2, 3, 5],
    [2, 7, 8, 6],
    [1, 3, 7, 0],
  ];

  public result: SolveResult;
  public executionTimeMs: number;

  public calculate(): void {
    const data = this.table.dataSource.data;

    const lastMatrixRow = this._getLastMatrixRow(data);
    const lastMatrixColumn = this._getLastMatrixColumn(data);
    const koefs = this._getKoefs(data);

    const startTimestampMs = performance.now();
    this.result = new GreedySolver().solve(koefs, lastMatrixColumn, lastMatrixRow);
    const endTimestampMs = performance.now();

    this.executionTimeMs = Number((endTimestampMs - startTimestampMs).toFixed(3));

    console.log(this.result);
    console.log(`${endTimestampMs - startTimestampMs} ms`);
  }

  public getColumnName(index: string): string {
    return this.table.displayedColumns[index + 1];
  }

  public setSample(size: number): void {
    switch (size) {
      case 3:
        this.data = this.copyMatrix(this.sample3x3);
        break;
      case 7:
        this.data = this.copyMatrix(this.sample7x7);
        break;
      case 15:
        this.data = this.copyMatrix(this.sample15x15);
        break;
    }
  }

  private copyMatrix(matrix: number[][]): number[][] {
    const result: number[][] = [];

    for (const row of matrix) {
      result.push(row.slice());
    }

    return result;
  }

  private _getLastMatrixRow(array: number[][]): number[] {
    const result = [...array[array.length - 1]];
    result.splice(-1, 1);

    return result;
  }

  private _getLastMatrixColumn(array: number[][]): number[] {
    const result = [];
    for (let i = 0; i < array.length - 1; i++) {
      result[i] = array[i][array[0].length - 1];
    }

    return result;
  }

  private _getKoefs(array: number[][]): number[][] {
    const result = [];
    for (let i = 0; i < array.length - 1; i++) {
      result[i] = [...array[i]];
      result[i].splice(-1, 1);
    }

    return result;
  }
}
