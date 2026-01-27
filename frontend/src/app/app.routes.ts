import { Routes } from '@angular/router';
import { IssueBoardComponent } from './components/issue-board/issue-board.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'issue-board', pathMatch: 'full'
    },
    {
        path: 'issue-board', component: IssueBoardComponent
    }

    //
];
