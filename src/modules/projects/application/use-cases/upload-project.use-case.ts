import { Inject, Injectable } from "@nestjs/common";
import type { ProjectRepositoryInterface } from "../interfaces/project-repository.interface";
import { ProjectStatus } from "../../domain/entity";
import { Project } from "../../domain/entity";

export interface UploadProjectCommand {
    projectName: string;
    ownerId: string;
    projectStatus: ProjectStatus;
}

@Injectable()
export class UploadProjectUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}
    
    async execute(command: UploadProjectCommand) {
        const project = Project.create(
            command.projectName,
            command.ownerId,
            command.projectStatus,
        )
        
        await this.projectRepository.save(project);
        return project;
    }
}