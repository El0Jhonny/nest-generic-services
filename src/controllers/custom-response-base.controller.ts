import {Body, Controller, Delete, Get, Param, Req} from '@nestjs/common';
import {BaseEntity} from "../entities/base.entity";
import {BaseService} from "../services/base.service";
import {Request} from "express";
import {IBaseController} from "../interfaces/controller.interface";

@Controller()
export abstract class CustomResponseBaseController<E extends BaseEntity, S extends BaseService<E, D>, D, R>
	implements IBaseController<S, D> {
	abstract getService(): S;

	abstract getTranslateMessage(message: string, lang: string): string;

	abstract getLang(req: Request): string;

	abstract getResponse(message: string, result: any): R;

	@Get()
	public async getAll(@Req() req: Request): Promise<R> {
		return this.getResponse(this.getTranslateMessage("readOk", this.getLang(req)),
			await this.getService().getAll());
	}

	@Get(":id")
	public async getById(@Param("id") id: string, @Req() req: Request): Promise<R> {
		return this.getResponse(this.getTranslateMessage("readOk", this.getLang(req)),
			await this.getService().getById(id));
	}

	public async save(@Body() dto: D, @Req() req: Request): Promise<R> {
		return this.getResponse(this.getTranslateMessage("saveOk", this.getLang(req)),
			await this.getService().save(dto, req));
	}

	public async updateById(@Param("id") id: string, @Body() dto: D, @Req() req: Request): Promise<R> {
		return this.getResponse(this.getTranslateMessage("updateOk", this.getLang(req)),
			await this.getService().updateById(id, dto, req));
	}

	@Delete(":id")
	public async deleteById(@Param("id") id: string, @Req() req: Request): Promise<R> {
		return this.getResponse(this.getTranslateMessage("deleteOk", this.getLang(req)),
			await this.getService().deleteById(id, req));
	}
}
