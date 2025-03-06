import { IsOptional, IsString } from 'class-validator';

export class BookQueryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    authorName?: string;

    @IsOptional()
    @IsString()
    description?: string;
}