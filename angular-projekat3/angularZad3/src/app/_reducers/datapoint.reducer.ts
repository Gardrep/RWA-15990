import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DataPointActions from '../_actions/datapoint.actions';
import { IDataPoint } from '../_models/IDataPoint';

export interface State extends EntityState<IDataPoint> {
    // additional entity state properties
    selectedDataPointId: number | null;
}

export function selectUserId(a: IDataPoint): number {
    //In this case this would be optional since primary key is id
    return a.ID;
  }
   
  export function sortByName(a: IDataPoint, b: IDataPoint): number {
    return a.name.localeCompare(b.name);
  }

export const adapter: EntityAdapter<IDataPoint> = createEntityAdapter<IDataPoint>({
    selectId: selectUserId,
    sortComparer: sortByName,
  });

   
export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedDataPointId: null,
  });
   
  const dataPointReducer = createReducer(
    initialState,
    on(DataPointActions.addDataPoint, (state, { dataPoint }) => {
      return adapter.addOne(dataPoint, state)
    }),
   /* on(DataPointActions.upsertUser, (state, { user }) => {
      return adapter.upsertOne(user, state);
    }),
    on(DataPointActions.addUsers, (state, { users }) => {
      return adapter.addMany(users, state);
    }),
    on(DataPointActions.upsertUsers, (state, { users }) => {
      return adapter.upsertUsers(users, state);
    }),*/
    on(DataPointActions.updateDataPoint, (state, { dataPoint }) => {
      return adapter.updateOne(dataPoint, state);
    }),
   /* on(DataPointActions.updateUsers, (state, { users }) => {
      return adapter.updateMany(users, state);
    }),
    on(DataPointActions.mapUsers, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),*/
    on(DataPointActions.deleteDataPoint, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
   /* on(DataPointActions.deleteUsers, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(DataPointActions.deleteUsersByPredicate, (state, { predicate }) => {
      return adapter.removeMany(predicate, state);
    }),*/
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
   
  // get the selectors
  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
   
  // select the array of dataPoint ids
  export const selectDataPointIds = selectIds;
   
  // select the dictionary of dataPoint entities
  export const selectDataPointEntities = selectEntities;
   
  // select the array of dataPoints
  export const selectAllDataPoints = selectAll;
   
  // select the total dataPoint count
  export const selectDataPointTotal = selectTotal;