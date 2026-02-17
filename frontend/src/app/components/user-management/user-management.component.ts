import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User, Role, UserDTO } from '../../models/user.model';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
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

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (data) => this.users = data,
            error: (err) => console.error('Errore nel caricamento utenti:', err)
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
                    this.loadUsers();
                    this.closeForm();
                },
                error: (err) => console.error('Errore nella modifica utente:', err)
            });
        } else {
            // Creazione
            this.userService.createUser(this.userForm).subscribe({
                next: () => {
                    this.loadUsers();
                    this.closeForm();
                },
                error: (err) => console.error('Errore nella creazione utente:', err)
            });
        }
    }

    deleteUser(id:number | undefined): void {
        if (id) {
            if (confirm('Sei sicuro di voler eliminare questo utente?')) {
                this.userService.deleteUser(id).subscribe({
                    next: () => this.loadUsers(),
                    error: (err) => console.error('Errore nell\'eliminazione utente:', err)
                });
            }
        }
    }

}