import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../localStorageService';


export interface IUser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');

  }

  ngOnInit() {
    }



    login(user: IUser) {
      console.log("from login.. User: ", user);
      const defaultUser: IUser = { username: 'Joshuah', password: 'Joshuah123' };
      if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
      this.localStorageService.saveItemsToLocalStorage(user);
      this.router.navigate(['cart', user]);
      } else {
      this.toastService.showToast('danger', 15000, 'Login failed! Please check your username or password');
      }
      } else {
      this.toastService.showToast('danger', 15000, 'Login failed! Please specify username and password');
      }
      


  }

}
