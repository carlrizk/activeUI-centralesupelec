import { v4 as uuidv4 } from "uuid";

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
      .map((node) => node.values);

    for (let i = 0; i < this.measures.length; i++) {
      result.push({
        measureName: this.measures[i],
        values: values.map((measureValues) => measureValues[i]),
        total: this.rootNode.values[i],
      });
    }

    return result;
  }
}

export class DataNode {
  children: Map<string, DataNode> = new Map();
  id: string = uuidv4();
  values: number[];
  label: string;
  constructor(label: string, values: number[]) {
    this.values = values;
    this.label = label;
  }

  hasChildren(): boolean {
    return this.children.size !== 0;
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
