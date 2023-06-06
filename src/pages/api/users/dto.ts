import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  public name!: string;

  @IsEmail()
  @IsNotEmpty()
  public email!: string;
}

export class UpdateUserInput {
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;
}
