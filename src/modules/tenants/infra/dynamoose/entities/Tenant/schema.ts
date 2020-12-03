import dynamoose from '@config/database';
import { Tenant } from '.';

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    organization_id: {
      type: String,
      required: true,
      rangeKey: true,
    },
    alias: {
      type: String,
      required: false,
      index: {
        global: true,
        name: 'idx_organization_alias',
      },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    master: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default dynamoose.model<Tenant>('Tenants', schema, {
  throughput: 'ON_DEMAND',
});
