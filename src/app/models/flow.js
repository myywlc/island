import { sequelize } from '../../core/db';
import { Model, Sequelize } from 'sequelize';

export class Flow extends Model {}

Flow.init(
  {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
  },
  {
    sequelize,
    tableName: 'flow',
  },
);
