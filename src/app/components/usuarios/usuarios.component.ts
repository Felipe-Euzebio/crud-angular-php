import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  list: any = [];
  limit = 10;
  start = 0;

  id = '';
  name = '';
  username = '';
  email = '';

  title = 'Inserir Usuário';
  searchInput = '';

  constructor(private provider: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.list = [];
    this.start = 0;
    this.carregar(this.searchInput);
  }


  carregar(input: string) {

    this.list = [];
    this.start = 0;

    return new Promise(resolve => {
      const dados = {
        requisicao: 'list',
        limit: this.limit,
        start: this.start,
        searchInput: input
      }
      this.provider.api(dados, 'api-usuarios.php').subscribe((data: any) => {
        for (const dado of data['result']) {
          this.list.push(dado);
        }
        resolve(true);
      });
    });
    
  }

}
