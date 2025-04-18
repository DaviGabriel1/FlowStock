export type DatabaseConfig = {
  type?: string;
  uri?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  name?: string;
  entities?: any[];
  synchronize?: boolean;
};
