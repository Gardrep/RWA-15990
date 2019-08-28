import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take  } from 'rxjs/operators';
import { DataPointService } from 'src/app/_services/data-point.service';
import { loadDataPointsSuccsess, addDataPoint } from "src/app/_actions/datapoint.actions"
import { loadDataPoints} from "src/app/_actions/datapoint.actions"
import { IDataPoint } from './_models';

@Injectable()
export class AppEffects {

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

  /*
  @Effect()
  addDP$ = createEffect(() => this.actions$.pipe(
    ofType(addDataPoint),
    take(1),
    mergeMap(() =>
      this.DBMngr.getDataPoints()
        .pipe(
          map(DP => addDataPoint({dataPoint:DP})),
          catchError(() => EMPTY)
        ))
  )
  );
  */

  constructor(
    private actions$: Actions,
    private DBMngr: DataPointService
  ) { }
}
