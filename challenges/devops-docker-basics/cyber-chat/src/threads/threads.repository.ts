import { Injectable } from "@nestjs/common";
import type {
  CreateThreadPayload,
  PatchThreadPayload,
  Thread,
} from "./Thread.interface";
import { threads } from "../../db/data";

@Injectable()
export class ThreadsRepository {
  private threads: Map<number, Thread> = new Map(
    threads.map((thread) => [thread.id, thread]),
  );

  findAll(): Thread[] {
    return Array.from(this.threads.values());
  }

  findById(id: number): Thread | null {
    return this.threads.get(id) || null;
  }

  create(thread: CreateThreadPayload): Thread {
    const id = Math.max(...this.threads.keys()) + 1;
    const newThread = { id, createdAt: new Date(), ...thread };
    this.threads.set(id, newThread);
    return newThread;
  }

  delete(id: number): boolean {
    return this.threads.delete(id);
  }

  update(id: number, thread: PatchThreadPayload): Thread | null {
    const existingThread = this.threads.get(id);

    if (!existingThread) return null;

    const updatedThread = {
      ...existingThread,
      ...thread,
      id: existingThread.id,
      createdAt: existingThread.createdAt,
    };

    this.threads.set(id, updatedThread);
    return updatedThread;
  }
}
