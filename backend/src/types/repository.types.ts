export interface RepositoryAnalysis{

    language :string ,

    frameWork? : string,
    runtime?: string;

  packageManager?: string;

  buildCommand?: string;

  startCommand?: string;

  port?: number;

  entryPoint?: string;

  dependencies?: string[];

  hasDatabase?: boolean;

  database?: string;
}