import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  @Input() title: string = 'Conferma';
  @Input() message: string = 'Sei sicuro di voler procedere?';
  @Input() confirmText: string = 'Conferma';
  @Input() cancelText: string = 'Annulla';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
