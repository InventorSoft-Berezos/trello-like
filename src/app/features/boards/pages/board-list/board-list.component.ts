import {Component} from '@angular/core';
import {BoardsService} from "@core/services/boards.service";
import {IBoard} from "@shared/interfaces/board.interface";
import {BoardAddComponent} from "../board-add/board-add.component";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import { take} from "rxjs";
import {BoardEditComponent} from "../board-edit/board-edit.component";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {

  public boards: IBoard[] = [];
  public board: IBoard;
  public modalRef: MDBModalRef | null = null;

  constructor(private modalService: MDBModalService,
              private boardsService: BoardsService,
  ) {
    this.getBoards();
  }

  getBoards(): void {
    this.boards = this.boardsService.getBoards();
  }

  openAddBoard() {
    this.modalRef = this.modalService.show(BoardAddComponent, {
      backdrop: false,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-side modal-sm modal-top-right mt-3 pt-3',
      containerClass: 'right',
      animated: true,
    });
    console.log(this.modalRef)
    this.modalRef.content.actionAdd.pipe(take(1)).subscribe((board: IBoard) => {
      this.boardsService.addBoard(board);
      this.getBoards();
    });
  }

  openEditBoard(id) {
    this.modalRef = this.modalService.show(BoardEditComponent, {
      backdrop: false,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-side modal-sm modal-top-right mt-3 pt-3',
      containerClass: 'right',
      animated: true,
    });
    console.log(this.modalRef);
    this.modalRef.content.actionEdit.pipe(take(1)).subscribe((id) => {
      this.boardsService.getBoardById(id);
      console.log(this.boards)
    });

  }

  toggleFavorite(board): void {
    this.boardsService.toggleFavorite(board);
    this.getBoards();
  }
}
