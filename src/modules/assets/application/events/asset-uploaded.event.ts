export class AssetUploadedEvent {
    constructor(
        public readonly assetId: string,
        public readonly filePath: string,
        public readonly ownerId: string,
    ) {}
}