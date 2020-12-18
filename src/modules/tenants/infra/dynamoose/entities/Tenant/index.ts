import { Document } from 'dynamoose/dist/Document';

export enum AuthenticationType {
  BEARER = 'BEARER',
}

export class Tenant extends Document {
  id: string;

  name: string;

  description?: string;

  authentications: Array<{
    type: AuthenticationType;
  }>;

  active: boolean;

  master?: boolean;
}

export default Tenant;
