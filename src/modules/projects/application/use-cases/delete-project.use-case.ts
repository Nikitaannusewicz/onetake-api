import { Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import type { ProjectRepositoryInterface } from "../interfaces/project-repository.interface";

export class DeleteProjectUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}
    
    async execute(projectId: string) {
        const project = await this.projectRepository.getProjectById(projectId);

        if (!project) {
            throw new NotFoundException(`Project does not exists`);
        }
        
        const deleted = await this.projectRepository.deleteProject(projectId);
        if (!deleted) {
            throw new InternalServerErrorException(`Failed to delete project. Project ID: ${projectId}`);
        }
        
        console.log("[Success] Project deleted from database");
    }
}