import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { DataPointService } from 'src/app/_services/data-point.service';
import { loadDataPointsSuccsess, addDataPoint, updateDataPoint, updateDataPointSuccess } from "src/app/_actions/datapoint.actions"
import { loadDataPoints } from "src/app/_actions/datapoint.actions"

@Injectable()
export class AppEffects {
  log = (...args: any[]) => <T>(data: T): T => {
    console.log.apply(null, args.concat([data]));
    return data;
  };

  @Effect()
  loadDPs$ = createEffect(() => this.actions$.pipe(
    ofType(loadDataPoints),
    mergeMap(() =>
      this.DBMngr.getDataPoints()
        .pipe(
          map(DPs => loadDataPointsSuccsess({ dataPoints: DPs })),
          catchError(() => EMPTY)
        ))
  )
  );

  @Effect()
  addDP$ = createEffect(() => this.actions$.pipe(
    ofType(updateDataPoint),
    map(payload=>payload.dataPoint),
    mergeMap((dataPoint) =>
      this.DBMngr.setDataPoint(dataPoint.id, dataPoint)
        .pipe(
          this.log((data)=>{return data}),
          map(DP => updateDataPointSuccess({
            dataPoint: {
              id: DP.id,
              changes: {
                ...DP
              }
            }
          })),
          catchError(() => EMPTY)
        ))
  )
  );

  constructor(
    private actions$: Actions,
    private DBMngr: DataPointService
  ) { }
}
