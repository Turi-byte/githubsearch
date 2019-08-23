import { Injectable } from '@angular/core';
import { User } from './user';
import { Repo } from './repo';
import { environment } from 'src/environments/environment.prod';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {
  user:User;
  repo:Repo;
  repository: Repo;
  private userName: string;
  private repoName: string;

  apiKey: string = environment.apiKey;
  userUrl: string = environment.userUrl;
  repoUrl: string = environment.repoUrl;

  constructor(private http:HttpClient){
    this.user= new User('','','','',0,0,0);
    this.repo = new Repo('','','');
    this.repository = new Repo('','','');
    this.userName = 'turi-byte';
    this.repoName = 'githubsearch'
  }

  userRequest(){
    interface ApiResponse{
      login:string,
      avatar_url:string,
      html_url:string,
      name:string,
      public_repos:number,
      followers:number,  
      following:number,
    }
    const promise = new Promise(((resolve,reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/users/'+this.userName + '?access_token='+ this.apiKey )
      .toPromise()
      .then(res=>{
        this.user.login = res.login;
        this.user.avatar_url = res.avatar_url;
        this.user.html_url = res.html_url;
        this.user.name = res.name;
        this.user.public_repos= res.public_repos;
        this.user.followers = res.followers;
        this.user.following = res.following;
      },error =>{
        reject(error);
      });
    }));
    return promise;
  }

  getRepos(username){
    interface ApiResponse{
      name: string;
      html_url: string;
      description: string;
    }

    const promise = new Promise(((resolve,reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/users/'+ this.userName +'/repos?access_token=' + this.apiKey )
      .toPromise()
      .then(repos =>{
        this.repository = repos;
      },error=>{
        reject(error);
      });
    }));
    return promise;
  }
  repoRequest(){
    interface ApiResponse{
      name: string;
      html_url: string;
      description: string;
    }

    const promise= new Promise(((resolve,reject)=>{
    this.http.get<ApiResponse>('https://api.github.com/repositories/'+ this.repoName + '?access_token=' +this.apiKey )
    .toPromise()
    .then(res =>{
      this.repo.name = res.name;
      this.repo.html_url = res.html_url;
      this.repo.description = res.description;
    },error => {
      reject(error);
    });
  }));
  return promise;
  }
  getUserName(username: string){
    this.userName = username;
  }
  getRepoName(reponame: string){
    this.repoName = reponame;
  }
}
