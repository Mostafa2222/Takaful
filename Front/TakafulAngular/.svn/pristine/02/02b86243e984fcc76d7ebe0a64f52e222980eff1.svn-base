import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TreeDisplayService {

  private treeDataSubject: BehaviorSubject<TreeNode<any>[]>;

  constructor() {
    const storedTreeData = this.getStoredTreeData();
    this.treeDataSubject = new BehaviorSubject<TreeNode<any>[]>(storedTreeData);
    this.treeData$ = this.treeDataSubject.asObservable();
  }

  treeData$;
  setTreeData(data: TreeNode<any>[]) {
    this.treeDataSubject.next(data);
    try {
      if (data && Array.isArray(data)) {
        localStorage.setItem('treeData', JSON.stringify(data));
      }
    } catch (e) {
      console.error('Error storing tree data:', e);
    }
  }

  private getStoredTreeData(): TreeNode<any>[] {
    const storedData = localStorage.getItem('treeData');

    if (!storedData) {
      return []; 
    }

    try {
      const parsedData = JSON.parse(storedData);

      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        console.error('Invalid tree data structure in localStorage');
        localStorage.removeItem('treeData'); 
        return [];
      }

    } catch (e) {
      console.error("Error parsing stored tree data:", e);
      localStorage.removeItem('treeData');
      return [];
    }
  }
}
