import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
 
import { IDataPoint } from '../_models/IDataPoint';
 
export const loadDataPoints = createAction('[DataPoint/API] Load DataPoints');
export const loadDataPointsSuccsess = createAction('[DataPoint/API] Load DataPoints Succsess', props<{ dataPoints: IDataPoint[] }>());
export const addDataPoint = createAction('[DataPoint/API] Add DataPoint', props<{ dataPoint: IDataPoint }>());
//export const upsertDataPoint = createAction('[DataPoint/API] Upsert DataPoint', props<{ dataPoint: IDataPoint }>());
//export const addUsers = createAction('[DataPoint/API] Add DataPoints', props<{ dataPoints: IDataPoint[] }>());
//export const upsertUsers = createAction('[DataPoint/API] Upsert DataPoints', props<{ dataPoints: IDataPoint[] }>());
export const updateDataPoint = createAction('[DataPoint/API] Update DataPoint', props<{ dataPoint: Update<IDataPoint> }>());
//export const updateUsers = createAction('[DataPoint/API] Update DataPoints', props<{ dataPoints: Update<IDataPoint>[] }>());
//export const mapUsers = createAction('[DataPoint/API] Map DataPoints', props<{ entityMap: EntityMap<IDataPoint> }>());
export const deleteDataPoint = createAction('[DataPoint/API] Delete DataPoint', props<{ id: string }>());
//export const deleteUsers = createAction('[DataPoint/API] Delete DataPoints', props<{ ids: string[] }>());
//export const deleteUsersByPredicate = createAction('[DataPoint/API] Delete DataPoints By Predicate', props<{ predicate: Predicate<IDataPoint> }>());
export const clearDataPoints = createAction('[DataPoint/API] Clear DataPoints');
export const fetchDataPoints = createAction('[DataPoint/API] Fetch DataPoints');
