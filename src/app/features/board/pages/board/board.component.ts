import {Component, OnInit} from '@angular/core';
import {IBoards} from "@shared/interfaces/boards.interface";
import {MDBModalService} from "angular-bootstrap-md";
import {BoardsService} from "@core/services/boards.service";
import {ActivatedRoute} from "@angular/router";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  public board: IBoards;
  public idBoard: string;
  public addColumnItem: FormGroup;
  public editColumnItem: FormGroup;
  public addTaskItem: FormGroup;
  public isAddColumn: boolean = false;
  public toggleAddTask: string = null;
  public toggleEditColumn: string = null;

  constructor(private modalService: MDBModalService,
              private boardsService: BoardsService,
              private route: ActivatedRoute,
              public fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.addColumnItem = this.fb.group({
      columnId: [''],
      columnName: [null, Validators.required],
      columnTask: [[]],
    });
    this.addTaskItem = this.fb.group({
      taskId: [''],
      taskName: [null, Validators.required],
      taskDesc: [''],
      taskTag: [[]],
      taskDate: [''],
      taskBackground: [''],
      taskUser: [[]]
    });
    this.editColumnItem = this.fb.group({
      columnId: [''],
      columnName: [null, Validators.required],
      columnTask: [[]],
    });
    this.idBoard = this.route.snapshot.paramMap.get('boardId');
    this.board = this.boardsService.getBoardById(this.idBoard);
  }

  drop(event: CdkDragDrop<any[]>) {
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

  addColumn(board) {
    if (this.addColumnItem.valid) {
      this.isAddColumn = !this.isAddColumn;
      this.boardsService.addColumn(board, this.idBoard);
      this.addColumnItem.reset();
    }
  }

  addTask(board, idColumn) {
    if (this.addTaskItem.valid) {
      this.toggleAddTask = null;
      this.boardsService.addTask(board, idColumn, this.idBoard);
      this.addTaskItem.reset();
    }
  }

  scrollTaskList(id: string) {
    this.toggleAddTask = id;
    setTimeout(() => {
      let scrollElement: Element = document.getElementsByClassName(`task__container-${id}`)[0];
      scrollElement.scrollTop = scrollElement.scrollHeight + 87;
    }, 0)
  }

  toggleAddColumnForm() {
    if (this.isAddColumn === true && this.addColumnItem.touched === true) {
      this.isAddColumn = !this.isAddColumn;
      this.addColumnItem.reset();
    }
  }

  toggleAddTaskForm() {
    this.toggleAddTask = null;
    this.addTaskItem.reset();
  }

  editColumnButton(id: string) {
    this.toggleEditColumn = id;
  }

  toggleEditColumnForm() {
    this.toggleEditColumn = null;
  }

  editColumn(form) {
    this.boardsService.editColumn(form, this.idBoard)
    this.toggleEditColumn = null;
  }
}
