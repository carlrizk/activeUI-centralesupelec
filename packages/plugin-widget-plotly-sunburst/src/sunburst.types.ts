/**
 * Represents the ready-to-use SunburstData required by a Sunburst Plot
 */
export class SunburstData {
  private readonly ids: string[] = [];
  private readonly labels: string[] = [];
  private readonly parents: string[] = [];
  private readonly values: number[] = [];
  private nextID = 0;

  /**
   * Add a node to the SunburstData
   * @returns The node ID of the added node
   */
  addNode(nodeLabel: string, nodeValue: number, parentId: number | ""): number {
    this.ids.push(this.nextID.toString());
    this.labels.push(nodeLabel);
    this.parents.push(parentId.toString());
    this.values.push(nodeValue);
    this.nextID += 1;
    return this.nextID - 1;
  }

  /**
   * @returns The list of the node IDs
   */
  getIDs(): string[] {
    return this.ids;
  }

  /**
   * @returns The list of the node labels
   */
  getLabels(): string[] {
    return this.labels;
  }

  /**
   * @returns The list of the node parent IDs
   */
  getParents(): string[] {
    return this.parents;
  }

  /**
   * @returns The list of the node values
   */
  getValues(): number[] {
    return this.values;
  }
}
