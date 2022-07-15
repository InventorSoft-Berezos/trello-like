import {Component, OnInit} from '@angular/core';
import {IBoards} from "@shared/interfaces/boards.interface";
import {MDBModalService} from "angular-bootstrap-md";
import {BoardsService} from "@core/services/boards.service";
import {ActivatedRoute} from "@angular/router";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  public board: IBoards;
  public idBoard: number;

  constructor(private modalService: MDBModalService,
              private boardsService: BoardsService,
              private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.idBoard = +this.route.snapshot.paramMap.get('boardId');
    this.board = this.boardsService.getBoardById(this.idBoard);
    console.log(this.board.boardColumn)
  }


  drop(event: CdkDragDrop<any[]>) {
    console.log(event)
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


/*
  getColumnTask(): ITask[] {
    let dropdownTask = this.board.boardColumn
      .filter(() => bo.columnTask.type == FieldType.ControlGroup)
      .map((x) => `${x.name}`);
    dropdownTask.push(this.rootDragDropName);
    return dropdownTask;
  }
*/


}
