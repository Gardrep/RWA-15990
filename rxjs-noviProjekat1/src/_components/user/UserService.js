import { fromEvent } from 'rxjs';
import { Global } from "../../Global.js";
import { mainDiv } from '../../index.js';

import { User } from "../../_models/User.js";
import { DBService } from "../../_services/DBService.js";

export const UserService = {
  attempt : 3,

  async ShowLogin() {
    await DBService.GetHTML("LogInForm").then((html) => mainDiv.innerHTML = html);
    var signin = document.getElementById("signin");
    fromEvent(signin, 'click').subscribe(() => {
      this.LogIn();
    });

    var signout = document.getElementById("signout");
    fromEvent(signout, 'click').subscribe(() => {
      Global.userID = "";
      document.getElementById("LoginLink").innerHTML = "Login";
      alert("Logged out successfully");
      localStorage.removeItem('token');
    });
  },

  LogIn() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    DBService.GetAll("users").subscribe((users) => {
      users = users.map(user => { return new User(user); });
      console.log(users);
      let user = users.filter((user) => { return user.username == username })[0];
      if (user && password == user.password ) {
        alert("Logged in successfully");
        Global.userID = user.id;
        document.getElementById("LoginLink").innerHTML = "Logged in as " + user.username;
        if(document.getElementById("rememberMe").checked == true)
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