import { sequelize } from '../../core/db';
import { Model, Sequelize } from 'sequelize';

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
};

export class Movie extends Model {}

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie',
});

export class Sentence extends Model {}

Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence',
});

export class Music extends Model {}

const musicFields = Object.assign(
  {
    url: Sequelize.STRING,
  },
  classicFields,
);

Music.init(musicFields, {
  sequelize,
  tableName: 'music',
});
