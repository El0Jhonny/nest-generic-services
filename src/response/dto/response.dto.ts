import {ApiProperty} from "@nestjs/swagger";

export class ResponseDto {
	@ApiProperty()
	code: number

	@ApiProperty()
	message: string

	@ApiProperty()
	isError: boolean

	@ApiProperty()
	duration: string

	@ApiProperty()
	result: any

	constructor(code: number, message: string, isError: boolean, result: any) {
		this.code = code
		this.message = message;
		this.isError = isError;
		this.result = result;
	}
}
