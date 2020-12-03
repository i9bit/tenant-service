import { DocumentArray, ObjectType } from 'dynamoose/dist/General';

interface DocumentRetrieverResponse<T> extends DocumentArray<T> {
  lastKey?: ObjectType;
  count: number;
}

export interface QueryResponse<T> extends DocumentRetrieverResponse<T> {
  queriedCount: number;
  timesQueried: number;
}

export interface ScanResponse<T> extends DocumentRetrieverResponse<T> {
  scannedCount: number;
  timesScanned: number;
}
