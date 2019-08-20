import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { DataPointService } from 'src/app/_services/data-point.service';
import { loadDataPointsSuccsess } from "src/app/_actions/datapoint.actions"
import { loadDataPoints} from "src/app/_actions/datapoint.actions"

@Injectable()
export class AppEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(loadDataPoints),
    mergeMap(() =>
      this.DBMngr.getDataPoints()
        .pipe(
          map(movies => loadDataPointsSuccsess({ dataPoints: movies })),
          catchError(() => EMPTY)
        ))
  )
  );
  constructor(
    private actions$: Actions,
    private DBMngr: DataPointService
  ) { }
}
