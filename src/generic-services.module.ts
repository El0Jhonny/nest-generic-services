import {DynamicModule} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {GenericServicesModuleConfigDto} from "./config/generic-services-module-config.dto";
import {MODULE_CONFIG} from "./enum/generic-services.constants";

export class GenericServicesModule {
	static register(oConfig: GenericServicesModuleConfigDto): DynamicModule {
		return {
			module: GenericServicesModule,
			imports: [
				CacheModule.register({
					isGlobal: true,
					...oConfig.cacheConfig
				})
			],
			providers: [
				{
					provide: MODULE_CONFIG,
					useValue: oConfig
				}
			]
		}
	}
}
