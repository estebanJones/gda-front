import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

 collegueConnecte: Observable<Collegue>

 idUtilisateur : string  = "";
 roleUtilisateur : string = localStorage.getItem("roleUtilisateur").toString();

 rangCollegue = ["1"];
 rangAdmin = ["1", "3"];


  links = [
    { title: 'Accueil', fragment: `${this.roleUtilisateur}/accueil` },
    { title: 'Gestion des absences', fragment: `${this.roleUtilisateur}/gestionAbsence` },
    { title: 'Planning des absences', fragment: `${this.roleUtilisateur}/planningAbsence` },
    { title: 'Validation demandes', fragment: `${this.roleUtilisateur}/validationDemandeAbsence` },
    { title: 'Vue synthétique', fragment: `${this.roleUtilisateur}/vueSynthetique` },
    { title: 'Jours feriés', fragment: `${this.roleUtilisateur}/joursFeries` },
  ];

  linksCollegueEtAdmin = [
    { title: 'Accueil', fragment: `/${this.roleUtilisateur}/accueil` },
    { title: 'Gestion des absences', fragment: `${this.roleUtilisateur}/gestionAbsence` },
    { title: 'Planning des absences', fragment: `${this.roleUtilisateur}/planningAbsence` },
    { title: 'Jours feriés', fragment: `${this.roleUtilisateur}/joursFeries` }
  ]

  faUserCircle = faUserCircle;
  isActive = true;
  onClickProfile() {
  
  }
 
  constructor(public route: ActivatedRoute,private router: Router,

    private authSrv : AuthService, private menuService : MenuService ) {
      this.idUtilisateur = localStorage.getItem("idUtilisateur");
      console.log("id User = ", this.idUtilisateur);
     }


  ngOnInit(): void {
    this.authSrv.verifierAuthentification().subscribe();
    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    console.log("Role User  = " + this.roleUtilisateur);
  }

  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate([''])
    );
  }
}
