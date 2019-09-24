import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromDataPoint from './datapoint.reducer';

export interface State {
  dataPoints: fromDataPoint.State;
}

export const reducers: ActionReducerMap<State> = {
  dataPoints: fromDataPoint.reducer,
};

export const selectDataPointState = createFeatureSelector<fromDataPoint.State>('dataPoints');

export const selectDataPointIds = createSelector(
  selectDataPointState,
  fromDataPoint.selectDataPointIds
);
export const selectDataPointEntities = createSelector(
  selectDataPointState,
  fromDataPoint.selectDataPointEntities
);
export const selectAllDataPoints = createSelector(
  selectDataPointState,
  fromDataPoint.selectAllDataPoints
);
export const selectDataPointTotal = createSelector(
  selectDataPointState,
  fromDataPoint.selectDataPointTotal
);
export const selectCurrentDataPointId = createSelector(
  selectDataPointState,
  fromDataPoint.getSelectedDataPointId
);

export const selectCurrentDataPoint = createSelector(
  selectDataPointEntities,
  selectCurrentDataPointId,
  (dataPointEntities, dataPointId) => dataPointEntities[dataPointId]
);