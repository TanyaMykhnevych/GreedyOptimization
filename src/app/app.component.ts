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

  private _getLastMatrixRow(array: number[][]): number[] {
    const result = [...array[array.length - 1]];
    result.splice(-1, 1);

    return result;
  }

  private _getLastMatrixColumn(array: number[][]): number[] {
    const result = [];
    for (let i = 0; i < array[0].length - 1; i++) {
      result[i] = array[i][array[0].length - 1];
    }
    result.splice(-1, 1);

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
