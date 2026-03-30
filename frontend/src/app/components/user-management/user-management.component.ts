import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User, Role, UserDTO } from '../../models/user.model';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { ToastService } from '../../services/toast.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, FormsModule, ConfirmModal, RouterModule],
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
    users: User[] = [];
    showForm = false;
    isEditMode = false;
    currentUserID?: number;
    userForm: UserDTO = {
        name: '',
        surname: '',
        email: '',
        password: '',
        role: Role.STANDARD
    };

    Role = Role; // Per accedere all'enum nel template
    isLoading: boolean = true;
    showConfirmDelete: boolean = false;
    userToDelete: number | null = null;

    constructor(
        private userService: UserService,
        private cdRef: ChangeDetectorRef,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.isLoading = true;
        this.userService.getUsers().subscribe({
            next: (data) => {
                this.users = data;
                this.isLoading = false;
                this.cdRef.detectChanges();
            },
            error: (err) => {
                console.error('Errore nel caricamento utenti:', err);
                this.isLoading = false;
                this.toastService.show('Errore nel caricamento utenti', 'error');
            }
        });
    }

    openCreateForm(): void {
        this.resetForm();
        this.showForm = true;
        this.isEditMode = false;
    }

    openEditForm(user: User): void {
        this.isEditMode = true;
        this.currentUserID = user.id;
        this.userForm = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: '', //non mostriamo la password
            role: user.role
        };
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.resetForm();
    }

    resetForm(): void {
        this.userForm = {
            name: '',
            surname: '',
            email: '',
            password: '',
            role: Role.STANDARD
        };
    }

    saveUser(): void {
        if (this.isEditMode && this.currentUserID) {
            // Modifica
            this.userService.updateUser(this.currentUserID, this.userForm).subscribe({
                next: () => {
                    this.toastService.show('Utente modificato con successo', 'success');
                    this.loadUsers();
                    this.closeForm();
                },
                error: (err) => {
                    console.error('Errore nella modifica utente:', err);
                    this.toastService.show('Errore nella modifica utente', 'error');
                }
            });
        } else {
            // Creazione
            this.userService.createUser(this.userForm).subscribe({
                next: () => {
                    this.toastService.show('Utente creato con successo', 'success');
                    this.loadUsers();
                    this.closeForm();
                },
                error: (err) => {
                    console.error('Errore nella creazione utente:', err);
                    this.toastService.show('Errore nella creazione utente', 'error');
                }
            });
        }
    }

    promptDeleteUser(id: number | undefined): void {
        if (!id) return;
        this.userToDelete = id;
        this.showConfirmDelete = true;
    }

    confirmDelete(): void {
        if (!this.userToDelete) return;
        this.userService.deleteUser(this.userToDelete).subscribe({
            next: () => {
                this.toastService.show('Utente eliminato con successo', 'success');
                this.showConfirmDelete = false;
                this.userToDelete = null;
                this.loadUsers();
            },
            error: (err) => {
                console.error('Errore nell\'eliminazione utente:', err);
                this.showConfirmDelete = false;
                this.toastService.show('Errore durante l\'eliminazione', 'error');
            }
        });
    }

    cancelDelete(): void {
        this.showConfirmDelete = false;
        this.userToDelete = null;
    }

    deleteUser(id: number | undefined): void {
        this.promptDeleteUser(id);
    }

}