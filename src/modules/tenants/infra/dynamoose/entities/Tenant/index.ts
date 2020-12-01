import { Document } from 'dynamoose/dist/Document';

export class Tenant extends Document {
  id: string;

  organization_id: string;

  alias?: string;

  name: string;

  description?: string;

  active: boolean;

  master?: true;
}

export default Tenant;
