import { v4 as uuidv4 } from "uuid";

export interface MeasureData {
  measureName: string;
  sum: number;
  values: number[];
}

export interface HierarchyData {
  ids: string[];
  labels: string[];
  parents: string[];
  values: number[];
}

/**
 * A node that represents one level in the hierarchy of data
 */
export class DataNode {
  children: Map<string, DataNode> = new Map();
  id: string = uuidv4();
  value: number;
  label: string;
  /**
   * Create a Node with a random id
   * @param {string} label - The label of the node
   * @param {number} value - The value of the node
   */
  constructor(label: string, value: number) {
    this.value = value;
    this.label = label;
  }
}
