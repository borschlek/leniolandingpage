// No storage needed for landing page
export interface IStorage {}
export class MemStorage implements IStorage {}
export const storage = new MemStorage();
