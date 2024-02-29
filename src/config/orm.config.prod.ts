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
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [Goal, Student, User], //[__dirname + '/**/*.entity{.ts,.js}']
    synchronize: false, // Disable this always in production
  }),
);