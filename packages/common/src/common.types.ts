export interface MeasureData {
  measureName: string;
  total: number;
  values: number[];
}

export class CellSetData {
  constructor(public rootNode: DataNode, public measures: string[]) {}

  getMeasureData(): MeasureData[] {
    const result: MeasureData[] = [];

    // Second dimension is the measure
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

export class DataNode {
  private readonly children: Map<string, DataNode> = new Map();
  private readonly childrenOrder: string[] = [];
  private readonly values: number[];
  private readonly label: string;

  constructor(label: string, values: number[]) {
    this.values = values;
    this.label = label;
  }

  getLabel(): string {
    return this.label;
  }

  addChild(key: string, node: DataNode): void {
    this.children.set(key, node);
    this.childrenOrder.push(key);
  }

  getChild(key: string): DataNode | undefined {
    return this.children.get(key);
  }

  getChildren(): DataNode[] {
    return this.childrenOrder.map((order) => this.children.get(order)!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }

  hasChildren(): boolean {
    return this.children.size !== 0;
  }

  getValues(): number[] {
    return this.values;
  }

  getLeafNodes(): DataNode[] {
    if (!this.hasChildren()) {
      return [this];
    }
    let result: DataNode[] = [];
    this.children.forEach((child) => {
      result = result.concat(child.getLeafNodes());
    });

    return result;
  }
}
