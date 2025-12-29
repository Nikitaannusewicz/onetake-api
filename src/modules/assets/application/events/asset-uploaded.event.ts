export class AssetUploadedEvent {
    constructor(
        public readonly assetId: string,
        private readonly filePath: string,
        private readonly ownerId: string,
    ) {}
}