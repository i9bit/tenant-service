import dynamoose from '@config/database';

import { Tenant } from '.';

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    authentications: {
      type: Array,
      schema: [
        {
          type: {
            type: String,
            required: true,
          },
        },
      ],
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
      index: {
        name: 'idx_active',
        global: true,
      },
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
