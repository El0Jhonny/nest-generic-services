import {Inject, Injectable} from '@nestjs/common';
import {BaseEntity} from "../entities/base.entity";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {DeepPartial, Repository} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {Request} from "express";
import {GenericServicesModuleConfigDto} from "../config/generic-services-module-config.dto";
import {MODULE_CONFIG} from "../enum/generic-services.constants";

@Injectable()
export abstract class BaseService<E extends BaseEntity, D> {
	@Inject(CACHE_MANAGER)
	protected readonly cacheManager: Cache;

	@Inject(MODULE_CONFIG)
	protected readonly oConfigModule: GenericServicesModuleConfigDto;

	abstract getRepository(): Repository<E>;

	abstract cacheKey(): string;

	async getAll(cachedResponse?: boolean): Promise<E[]> {
		if (typeof cachedResponse !== "boolean") {
			cachedResponse = true;
		}

		if (cachedResponse) {
			let oValue: E[] = await this.cacheManager.get(`${this.cacheKey()}-getAll`) as E[];

			if (!oValue) {
				oValue = await this.getAll(false);
				await this.cacheManager.set(`${this.cacheKey()}-getAll`, oValue, this.oConfigModule.cacheTimeInMs);
			}

			return oValue;
		} else {
			return this.getRepository().find();
		}
	}

	async getById(id: string, cachedResponse?: boolean): Promise<E> {
		if (typeof cachedResponse !== "boolean") {
			cachedResponse = true;
		}

		if (cachedResponse) {
			let oValue: E = await this.cacheManager.get(`${this.cacheKey()}-getById-${id}`) as E;

			if (!oValue) {
				oValue = await this.getById(id, false);
				await this.cacheManager.set(`${this.cacheKey()}-getById-${id}`, oValue, this.oConfigModule.cacheTimeInMs);
			}

			return oValue;
		} else {
			return await this.getRepository().findOne({
				// @ts-ignore
				where: {
					id: id
				}
			});
		}
	}

	async save(dto: DeepPartial<E> | D | any, req: Request): Promise<E> {
		const oValue: E = await this.getRepository().save(dto as any);
		await this.cacheManager.reset();
		return oValue;
	}

	async updateById(id: string, dto: QueryDeepPartialEntity<E> | D, req: Request): Promise<E> {
		await this.getRepository().update(id, dto as any);
		await this.cacheManager.reset();
		return await this.getById(id);
	}

	async deleteById(id: string, req: Request): Promise<boolean> {
		await this.getRepository().softDelete(id);
		await this.cacheManager.reset();
		return true;
	}
}
