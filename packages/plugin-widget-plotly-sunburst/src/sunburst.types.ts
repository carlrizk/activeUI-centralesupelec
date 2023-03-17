export class SunburstData {
  private ids: string[] = [];
  private labels: string[] = [];
  private parents: string[] = [];
  private values: number[] = [];
  private currentID = 0;

  addNode(nodeLabel: string, nodeValue: number, parentId: number | ""): number {
    this.ids.push(this.currentID.toString());
    this.labels.push(nodeLabel);
    this.parents.push(parentId.toString());
    this.values.push(nodeValue);
    this.currentID += 1;
    return this.currentID - 1;
  }

  getCurrentID() {
    return this.currentID;
  }

  getIDs() {
    return this.ids;
  }

  getLabels() {
    return this.labels;
  }

  getParents() {
    return this.parents;
  }

  getValues() {
    return this.values;
  }
}
