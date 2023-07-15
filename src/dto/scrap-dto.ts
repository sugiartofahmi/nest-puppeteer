import { IsUrl, IsString } from 'class-validator';

export class ScrapDto {
  @IsString()
  @IsUrl()
  public url!: string;
}
