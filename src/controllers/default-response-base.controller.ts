import {Body, Controller, Delete, Get, Param, Req} from '@nestjs/common';
import {BaseEntity} from "../entities/base.entity";
import {BaseService} from "../services/base.service";
import {Request} from "express";
import {IBaseController} from "../interfaces/controller.interface";
import {ResponseDto} from "../response/dto/response.dto";

@Controller()
export abstract class DefaultResponseBaseController<E extends BaseEntity, S extends BaseService<E, D>, D>
	implements IBaseController<S, D> {
	abstract getService(): S;

	abstract getTranslateMessage(message: string, lang: string): string;

	abstract getLang(req: Request): string;

	@Get()
	public async getAll(@Req() req: Request): Promise<ResponseDto> {
		return new ResponseDto(200, this.getTranslateMessage("readOk", this.getLang(req)),
			false, await this.getService().getAll());
	}

	@Get(":id")
	public async getById(@Param("id") id: string, @Req() req: Request): Promise<ResponseDto> {
		return new ResponseDto(200, this.getTranslateMessage("readOk", this.getLang(req)),
			false, await this.getService().getById(id));
	}

	public async save(@Body() dto: D, @Req() req: Request): Promise<ResponseDto> {
		return new ResponseDto(200, this.getTranslateMessage("saveOk", this.getLang(req)),
			false, await this.getService().save(dto, req));
	}

	public async updateById(@Param("id") id: string, @Body() dto: D, @Req() req: Request): Promise<ResponseDto> {
		return new ResponseDto(200, this.getTranslateMessage("updateOk", this.getLang(req)),
			false, await this.getService().updateById(id, dto, req));
	}

	@Delete(":id")
	public async deleteById(@Param("id") id: string, @Req() req: Request): Promise<ResponseDto> {
		return new ResponseDto(200, this.getTranslateMessage("deleteOk", this.getLang(req)),
			false, await this.getService().deleteById(id, req));
	}
}
