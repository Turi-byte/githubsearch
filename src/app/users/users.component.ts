import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Repo } from '../repo';
import { GithubServiceService } from '../github-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchUsers = true;
  user: User;
  repo: Repo;
  repository: Repo;
  username: string;
  reponame: string;

  constructor(private github: GithubServiceService) { }

  profileRequest(){
    this.github.getUserName(this.username);
    this.github.userRequest();
    this.user = this.github.user;
    this.github.getRepos(this.username);
    this.repository = this.github.repository;
    console.log(this.repository);
  }

  getRepository(){
    this.github.getRepoName(this.reponame);
    this.github.repoRequest();
    this.repo = this.github.repo;

  }

  switchSearch(){
    this.searchUsers = !this.searchUsers;
  }

  ngOnInit() {
    this.github.userRequest();
    this.user = this.github.user;

    this.github.repoRequest();
    this.repo = this.github.repo;

    this.github.getRepos(this.username);
    this.repository = this.github.repository;
  }

}
