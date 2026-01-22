import { v4 as uuidv4 } from 'uuid';

export enum ProjectStatus {
    PRODUCTION = "PRODUCTION",
    MIXING = "MIXING",
    MASTERING = "MASTERING",
    RELEASE = "RELEASE",
}

export enum ProjectGenre {
    POP = "POP",
    ELECTRONIC = "ELECTRONIC",
    HIP_HOP = "HIP_HOP",
    RnB = "RnB",
    TRAP = "TRAP",
    SOUL = "SOUL",
    ROCK = "ROCK",
}

export class Project {
    readonly id: string;
    projectName: string;
    ownerId: string;
    projectStatus: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    bpm?: number;
    key?: string;
    genre?: ProjectGenre;
    
    private constructor (
        id: string,
        projectName: string,
        ownerId: string,
        projectStatus: ProjectStatus,
        createdAt: Date,
        updatedAt: Date,
        bpm?: number,
        key?: string,
        genre?: ProjectGenre,
    ) {
        this.id = id;
        this.projectName = projectName;
        this.ownerId = ownerId;
        this.projectStatus = projectStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.bpm = bpm;
        this.key = key;
        this.genre = genre;
    }
    
    static create(
        projectName: string,
        ownerId: string,
        projectStatus: ProjectStatus,
    ): Project {
        const now = new Date();
        return new Project(
            uuidv4(),
            projectName,
            ownerId,
            projectStatus,
            now,
            now,
        )
    }
}

