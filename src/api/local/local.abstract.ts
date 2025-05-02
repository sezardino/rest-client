import { z, ZodType } from "zod";
import { ApiError } from "../api.error";
import type { LSApiName } from "./local.const";

type BasicItem = {
  id: string;
};

type LocalApiServiceProps<T extends BasicItem> = {
  name: LSApiName;
  schema: ZodType<T>;
  defaultValue?: T[];
};

export class AbstractLocalApiService<T extends BasicItem> {
  private name: LSApiName;
  private entitySchema: ZodType<T>;
  private tableSchema: ZodType<T[]>;
  private defaultValue?: T[];

  constructor(props: LocalApiServiceProps<T>) {
    const { name, schema, defaultValue } = props;

    this.name = name;
    this.entitySchema = schema;
    this.tableSchema = z.array(schema);
    this.defaultValue = defaultValue;
  }

  private async getData(): Promise<T[]> {
    try {
      const items = localStorage.getItem(this.name);
      if (!items) return this.defaultValue ?? [];

      let parsedData;
      try {
        parsedData = JSON.parse(items);
      } catch {
        throw new ApiError("Error parsing data from localStorage", 400);
      }

      const validatedData = this.tableSchema.safeParse(parsedData);
      if (!validatedData.success) {
        throw new ApiError("Invalid data in localStorage", 422);
      }

      return validatedData.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Unexpected error occurred", 500);
    }
  }

  private async setData(data: T[]): Promise<void> {
    try {
      const validatedData = this.tableSchema.safeParse(data);
      if (!validatedData.success) {
        throw new ApiError("Invalid data", 422);
      }

      localStorage.setItem(this.name, JSON.stringify(validatedData.data));
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Unexpected error occurred", 500);
    }
  }

  protected async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.name);
    } catch (error) {
      throw new ApiError("Failed to clear local storage", 500);
    }
  }

  async getAll(): Promise<T[]> {
    return this.getData();
  }

  async getById(id: string): Promise<T> {
    const data = await this.getData();
    const item = data.find((i) => i.id === id);

    if (!item) {
      throw new ApiError(`Item with id ${id} not found`, 404);
    }

    return item;
  }

  async create(dto: Omit<T, "id">): Promise<T> {
    const newItem = { ...dto, id: crypto.randomUUID() } as T;
    const validation = this.entitySchema.safeParse(newItem);

    if (!validation.success) {
      throw new ApiError("Invalid data for new item", 422);
    }

    const data = await this.getData();
    await this.setData([...data, newItem]);
    return newItem;
  }

  async update(id: string, dto: Partial<Omit<T, "id">>): Promise<void> {
    const data = await this.getData();
    const index = data.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new ApiError(`Item with id ${id} not found`, 404);
    }

    const updatedItem = { ...data[index], ...dto };
    const validation = this.entitySchema.safeParse(updatedItem);

    if (!validation.success) {
      throw new ApiError("Invalid data for updated item", 422);
    }

    data[index] = updatedItem;
    await this.setData(data);
  }

  async delete(id: string): Promise<void> {
    const data = await this.getData();
    const index = data.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new ApiError(`Item with id ${id} not found`, 404);
    }

    data.splice(index, 1);
    await this.setData(data);
  }

  async deleteMany(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.delete(id)));
  }

  async duplicate(id: string): Promise<T> {
    const item = await this.getById(id);
    const { id: _, ...itemWithoutId } = item;
    return this.create(itemWithoutId);
  }

  async save() {
    const items = await this.getAll();
    await this.setData(items);
  }
}
