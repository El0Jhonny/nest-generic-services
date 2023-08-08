import {CacheModuleOptions} from "@nestjs/cache-manager/dist/interfaces/cache-module.interface";

export interface GenericServicesModuleConfigDto {
	cacheTimeInMs: number
	cacheConfig: CacheModuleOptions
}
