import { User } from "./User.js";
import { Observable, fromEvent} from 'rxjs';
import { Global } from "./index.js";

export class UserService{
    constructor()
    {
        this.attempt = 3; // Variable to count number of attempts.
    }

    GetAllUsers(){
        return Observable.create(generator => {
            fetch("http://178.149.70.120:3000/users")
            .then(x=>x.json())
                .then(data=>{
                    generator.next(
                        data.map(user=>{
                        return new User(user);
                        })
                    );
                });
        });
    }

    ShowLogin(mainDiv)
    {
        mainDiv.innerHTML=`
        <form class="form-horizontal">
        <div class="form-group">
          <label for="username" class="col-sm-2 control-label">Username</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="username" placeholder="Username">
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-2 control-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox"> Remember me
              </label>
            </div>
          </div>
        </div>
        <div class="form-row align-items-center">
            <div class="col--sm-1 my-1">
                <button type="submit" class="btn btn-primary" id="signin">Sign in</button>
            </div>
            <div class="col--sm-1 my-1">
                <button type="submit" class="btn btn-primary" id="signout">Sign out</button>
            </div>
        </div>
      </form>
        `
        var signin = document.getElementById("signin");
        fromEvent(signin, 'click').subscribe(() =>{
            this.LogIn();
        });

        var signout = document.getElementById("signout");
        fromEvent(signout, 'click').subscribe(() =>{
            Global.userID = "";
            document.getElementById("LoginLink").innerHTML = "Login";
            alert("Logged out successfully");
        });
    }

    LogIn()
    {
    // Below function Executes on click of login button.
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        this.GetAllUsers().subscribe((users)=>{
            let user = users.filter((user)=>{return user.username == username})[0];
                    if (password == user.password){
                        alert("Logged in successfully");
                        console.log("Logged in successfully");
                        Global.userID = user.id;
                        document.getElementById("LoginLink").innerHTML = "Logged in " + user.username;            
                    }
                    else{
                        this.attempt --;
                        alert("You have "+this.attempt+" attempts left");
                        if( this.attempt == 0){
                            document.getElementById("username").disabled = true;
                            document.getElementById("password").disabled = true;
                            document.getElementById("signin").disabled = true;
                        }
                    }           
        });
    }
}