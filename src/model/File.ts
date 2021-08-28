import fs from "fs";
import path from "path";

const BASE_PATH = "./src/assets/";
const EXT = ".txt";

export default class File {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  /**
   * @returns a string with the path to the file
   */
  private getFullPath(): string {
    return path.join(BASE_PATH, this.name + EXT);
  }

  /**
   * creates the id for the new product
   * @returns the next id or 1 if the list is empty
   */
  private async generateId(): Promise<number> {
    try {
      return ++(await this.internalRead()).length;
    } catch (error) {
      console.log(error);
    }
    return 1;
  }

  /**
   * @returns content of the file or an empty array if the file doesn't exist
   */
  private async internalRead(): Promise<object[]> {
    try {
      return JSON.parse(
        await fs.promises.readFile(this.getFullPath(), "utf-8")
      );
    } catch (error) {
      // console.log(error);
    }
    return [];
  }

  /**
   * @returns an array with all the elements on te file
   */
  async read(): Promise<Object[]> {
    try {
      return JSON.parse(
        await fs.promises.readFile(this.getFullPath(), "utf-8")
      );
    } catch (error) {
      // console.log(error);
      console.log([]);
    }
    return [];
  }

  async save(title: string, price: number, thumbnail: string): Promise<void> {
    let currentContent: object[] = [];
    try {
      currentContent = await this.internalRead();
    } catch (error) {
      console.log(error);
    }
    const newContent = JSON.stringify([
      ...currentContent,
      {
        id: await this.generateId(),
        title,
        price,
        thumbnail,
      },
    ]);
    try {
      await fs.promises.writeFile(this.getFullPath(), newContent);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(): Promise<void> {
    try {
      await fs.promises.unlink(this.getFullPath());
    } catch (error) {
      console.log(error);
    }
  }
}
