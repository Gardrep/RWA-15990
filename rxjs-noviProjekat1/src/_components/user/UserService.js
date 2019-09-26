import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { CoreBuilder } from "../../CoreBuilder.js";
import { mainDiv } from '../../index.js';

import { User } from "../../_models/User.js";
import { DBService } from "../../_services/DBService.js";

export const UserService = {
  attempt: 3,

  async ShowLogin() {
    await DBService.GetUsersHTML("LogInForm").then((html) => mainDiv.innerHTML = html);

    var signin = document.getElementById("signin");
    fromEvent(signin, 'click').subscribe(() => {
      this.LogIn();
    });

    var signout = document.getElementById("signout");
    fromEvent(signout, 'click').subscribe(() => {
      alert("Logged out successfully");
      CoreBuilder.userID = "";
      document.getElementById("LoginLink").innerHTML = "Login";
      localStorage.removeItem('token');
    });
  },

  LogIn() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    DBService.GetAll("users").pipe(
      map(user => new User(user)),
      filter(user => user.username == username)
    ).subscribe((user) => {
      if (user && password == user.password) {
        alert(user.username + " logged in successfully");
        CoreBuilder.userID = user.id;
        document.getElementById("LoginLink").innerHTML = "Logged in as " + user.username;
        if (document.getElementById("rememberMe").checked == true)
          localStorage.setItem('token', user.id);
      }
      else {
        this.attempt--;
        alert("You have " + this.attempt + " attempts left");
        if (this.attempt == 0) {
          document.getElementById("username").disabled = true;
          document.getElementById("password").disabled = true;
          document.getElementById("signin").disabled = true;
        }
      }
    });
  }
}