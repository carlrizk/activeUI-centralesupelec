import { CellSet } from "@activeviam/activeui-sdk";
import { v4 as uuidv4 } from "uuid";

export interface SunburstData {
  ids: string[];
  labels: string[];
  parents: string[];
  values: number[];
}

/**
 * A node that represents one level in the hierarchy of data
 */
export class Node {
  children: Map<string, Node> = new Map();
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

/**
 * Extracts measure data from a cellset
 * @param {CellSet} data The CellSet or undefined
 * @returns {Node} the root node of a tree that represents the levels of the hierchy
 */
export function extractData(data?: CellSet): Node | null {
  if (data == null) return null;

  const columnsAxis = data.axes.at(0);
  const rowAxis = data.axes.at(1);

  if (columnsAxis === undefined || rowAxis === undefined) {
    return null;
  }
  const columnCount = columnsAxis.positions.length;

  if (columnCount !== 1) return null;

  let values = data.cells.map((value) => value.value as number);
  const total = values[0];
  values = values.slice(1);

  const result: Node = new Node("Total", total);

  const positions = rowAxis.positions
    .map((position) => position.map((pos) => pos.namePath))
    .map((position) => position.flat().filter((label) => label !== "AllMember"))
    .slice(1);

  for (let posidx = 0; posidx < positions.length; posidx++) {
    const subpositions = positions[posidx];
    let cursor = result;
    for (let subposidx = 0; subposidx < subpositions.length; subposidx++) {
      const subposition = subpositions[subposidx];
      if (!cursor.children.has(subposition)) {
        cursor.children.set(subposition, new Node(subposition, values[posidx]));
      }
      cursor = cursor.children.get(subposition) ?? result;
    }
  }

  return result;
}
