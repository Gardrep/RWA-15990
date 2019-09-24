import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
 
import { IDataPoint } from '../_models/IDataPoint';
 
export const loadDataPoints = createAction('[DataPoint/API] Load DataPoints');
export const loadDataPointsSuccsess = createAction('[DataPoint/API] Load DataPoints Succsess', props<{ dataPoints: IDataPoint[] }>());
export const addDataPoint = createAction('[DataPoint/API] Add DataPoint', props<{ dataPoint: IDataPoint }>());
export const updateDataPoint = createAction('[DataPoint/API] Update DataPoint', props<{ dataPoint: IDataPoint }>());
export const updateDataPointSuccess = createAction('[DataPoint/API] Update DataPointSuccess', props<{ dataPoint: Update<IDataPoint> }>());
export const deleteDataPoint = createAction('[DataPoint/API] Delete DataPoint', props<{ id: string }>());
export const clearDataPoints = createAction('[DataPoint/API] Clear DataPoints');
export const fetchDataPoints = createAction('[DataPoint/API] Fetch DataPoints');
