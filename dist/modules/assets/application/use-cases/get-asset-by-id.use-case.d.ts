import { Asset } from "../../domain/entity";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
export declare class GetAssetByIdUseCase {
    private readonly assetRepository;
    constructor(assetRepository: IAssetRepository);
    execute(id: string): Promise<Asset>;
}
