import { Inject, Injectable } from "@nestjs/common";
import type { ProjectRepositoryInterface } from "../interfaces/project-repository.interface";

Injectable()
export class ListProjectsUseCase {
    constructor(
        @Inject('ProjectRepositoryInterface')
        private readonly projectRepository: ProjectRepositoryInterface, 
    ) {}
    
    async execute() {}
}