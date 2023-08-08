import {Request} from "express";

export interface IBaseController<S, D> {
	getService(): S;

	getTranslateMessage(message: string, lang: string): string;

	getLang(req: Request): string;

	getAll(req: Request): Promise<any>;

	getById(id: string, req: Request): Promise<any>;

	save(dto: D, req: Request): Promise<any>;

	updateById(id: string, dto: D, req: Request): Promise<any>;

	deleteById(id: string, req: Request): Promise<any>;
}
