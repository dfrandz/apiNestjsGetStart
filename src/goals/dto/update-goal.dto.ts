import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalDto } from './create-goal.dto';

// Pulls types from CreateGoalDto into UpdateGoalDto
export class UpdateGoalDto extends PartialType(CreateGoalDto) {}