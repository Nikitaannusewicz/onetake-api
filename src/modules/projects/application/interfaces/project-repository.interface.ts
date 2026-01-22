import { Project, ProjectGenre, ProjectStatus } from "../../domain/entity";

export interface Filters {
    bpm?: number,
    key?: string,
    genre?: ProjectGenre,
}

export interface UpdateProject {
    projectName: string,
    projectStatus: ProjectStatus
    bpm?: number,
    key?: string,
    genre?: ProjectGenre,
}

export interface ProjectRepositoryInterface {
    save(project: Project): Promise<Project>;
    getProjectById(projectId: string): Promise<Project>;
    getProjectsByOwnerId(ownerId: string): Promise<Project[]>;
    listProjects(filters?: Filters): Promise<Project[]>;
    updateProject(data: UpdateProject): Promise<Project>;
    deleteProject(projectId: string): Promise<boolean>;
    exists(projectId: string): Promise<boolean>;
}