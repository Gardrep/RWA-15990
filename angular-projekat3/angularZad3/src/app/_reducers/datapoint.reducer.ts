import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DataPointActions from '../_actions/datapoint.actions';
import { IDataPoint } from '../_models/IDataPoint';

export interface State extends EntityState<IDataPoint> {
  selectedDataPointId: number | null;
}

export function selectUserId(a: IDataPoint): number {
  return a.id;
}

export function sortByName(a: IDataPoint, b: IDataPoint): number {
  return a.date > b.date ? 1 : -1;
}

export const adapter: EntityAdapter<IDataPoint> = createEntityAdapter<IDataPoint>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  selectedDataPointId: null,
});

const dataPointReducer = createReducer(
  initialState,
  on(DataPointActions.addDataPoint, (state, { dataPoint }) => {
    return adapter.addOne(dataPoint, state)
  }),
  on(DataPointActions.updateDataPointSuccess, (state, { dataPoint }) => {
    return adapter.updateOne(dataPoint, state);
  }),
  on(DataPointActions.deleteDataPoint, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(DataPointActions.loadDataPointsSuccsess, (state, { dataPoints }) => {
    return adapter.addAll(dataPoints, state);
  }),
  on(DataPointActions.clearDataPoints, state => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return dataPointReducer(state, action);
}

export const getSelectedDataPointId = (state: State) => state.selectedDataPointId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectDataPointIds = selectIds;

export const selectDataPointEntities = selectEntities;

export const selectAllDataPoints = selectAll;

export const selectDataPointTotal = selectTotal;