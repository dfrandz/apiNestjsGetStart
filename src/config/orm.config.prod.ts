// orm.config.prod.ts
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Goal } from 'src/goals/entities/goal.entity';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/users/entities/user.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'frandz',
    database: 'goaltracker-db',
    entities: [Goal, Student, User], //[__dirname + '/**/*.entity{.ts,.js}']
    synchronize: false, // Disable this always in production
  }),
);