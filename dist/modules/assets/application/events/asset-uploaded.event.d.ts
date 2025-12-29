export declare class AssetUploadedEvent {
    readonly assetId: string;
    private readonly filePath;
    private readonly ownerId;
    constructor(assetId: string, filePath: string, ownerId: string);
}
