import { Document } from 'dynamoose/dist/Document';
import Schema from './schema';

import { QueryResponse, ScanResponse } from '../../@types/dynamoose';

export class ITenant extends Document {
  id: string;

  organization_id: string;

  alias?: string;

  name: string;

  description?: string;

  active: boolean;

  master?: true;
}

export default {
  Get: (id: string): Promise<ITenant | undefined> => Schema.get(id),
  Create: (data: Partial<ITenant>): Promise<ITenant> => Schema.create(data),
  All: (): Promise<ScanResponse<ITenant>> => Schema.scan().exec(),
  AllByTenant: (id: string): Promise<QueryResponse<ITenant>> =>
    Schema.query('id').eq(id).exec(),
  GetByAlias: (alias: string): Promise<QueryResponse<ITenant>> =>
    Schema.query('alias').eq(alias).using('idx_organization_alias').exec(),
};
