/** Represents the data of a single measure. */
export interface MeasureData {
  measureName: string;
  total: number;
  values: number[];
}

/**
 * Represents the data extracted from a CellSet as a tree structure composed of DataNodes.
 */
export class CellSetData {
  /**
   * @constructor
   * @param {DataNode} rootNode - The root node of the tree.
   * @param {string[]} measures - The list of measures names.
   */
  constructor(public rootNode: DataNode, public measures: string[]) {}

  /**
   * @returns a list of MeasureData representing the leafs of the tree.
   */
  getMeasureData(): MeasureData[] {
    const result: MeasureData[] = [];

    const values: number[][] = this.rootNode
      .getLeafNodes()
      .map((node) => node.getValues());

    for (let i = 0; i < this.measures.length; i++) {
      result.push({
        measureName: this.measures[i],
        values: values.map((measureValues) => measureValues[i]),
        total: this.rootNode.getValues()[i],
      });
    }

    return result;
  }
}

/**
 * Represents a node in the CellSetData tree.
 */
export class DataNode {
  private readonly children: Map<string, DataNode> = new Map();
  private readonly childrenOrder: string[] = [];
  private readonly values: number[];
  private readonly label: string;

  /**
   * @constructor
   * @param {string} label - The label associated with this node.
   * @param {number[]} values - The list of measures values.
   */
  constructor(label: string, values: number[]) {
    this.values = values;
    this.label = label;
  }

  /** @returns The label of the node. */
  getLabel(): string {
    return this.label;
  }

  /** Add a child to the node. */
  addChild(key: string, node: DataNode): void {
    this.children.set(key, node);
    this.childrenOrder.push(key);
  }

  /** @return The child with the corresponding key or undefined. */
  getChild(key: string): DataNode | undefined {
    return this.children.get(key);
  }

  /** @return The list of children in the order of addition. */
  getChildren(): DataNode[] {
    return this.childrenOrder.map((order) => this.children.get(order)!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }

  /** @return true if the node has children, false otherwise. */
  hasChildren(): boolean {
    return this.children.size !== 0;
  }

  /** @return The values of the node. Index 0 corresponds to the value for the first measure etc... */
  getValues(): number[] {
    return this.values;
  }

  /** @return The leafs of the tree with the current DataNode as a root. */
  getLeafNodes(): DataNode[] {
    if (!this.hasChildren()) {
      return [this];
    }
    let result: DataNode[] = [];
    this.getChildren().forEach((child) => {
      result = result.concat(child.getLeafNodes());
    });

    return result;
  }
}
