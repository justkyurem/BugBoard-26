import { Routes } from '@angular/router';
import { IssueBoardComponent } from './components/issue-board/issue-board.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'issue-board', pathMatch: 'full'
    },
    {
        path: 'issue-board', component: IssueBoardComponent
    },
    {
        path: 'create-issue', component: CreateIssueComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'issue/:id', component: IssueDetailComponent
    },
    {
        path: 'user', component: UserManagementComponent, canActivate: [AdminGuard]
    }
];
