import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/api';
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

  users: Users = {
    id: 0,
    nome: '',
    usuario: '',
    senha: ''
  }

  title = 'Inserir Usuário';
  searchInput = '';

  path = 'api-usuarios.php';

  constructor(private provider: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.list = [];
    this.start = 0;
    this.carregar(this.searchInput);
  }


  carregar(input: string) {

    this.list = [];
    this.start = 0;

    return new Promise((resolve) => {
      const dados = {
        requisicao: 'listar',
        limit: this.limit,
        start: this.start,
        searchInput: input
      };
      this.provider.api(dados, this.path).subscribe((data: any) => {
        for (const dado of data['result']) {
          this.list.push(dado);
        }
        resolve(true);
      });
    });

  }


  cadastrar(): any {
    if (this.users.nome !== '' && this.users.usuario !== '' && this.users.senha !== '') {
      return new Promise(() => {
        const dados = {
          requisicao: 'add',
          nome: this.users.nome,
          usuario: this.users.usuario,
          senha: this.users.senha
        };
        this.provider.api(dados, this.path)
          .subscribe((data: any) => {

            if (data['success']) {
              alert('Salvo com sucesso!!');
              window.location.reload();
              //this.router.navigate(['/usuarios']);
            } else {
              alert('Erro ao Salvar!!');
            }

          });
      });
    } else {
      alert('Prencha os Campos!');
    }
  }


  dadosEditar(nome: string, usuario: string, senha: string, id: number) {
    this.title = 'Editar Usuário';
    this.users.nome = nome;
    this.users.usuario = usuario;
    this.users.senha = senha;
    this.users.id = id;
  }


  editar(): any {
    if (this.users.nome !== '' && this.users.usuario !== '' && this.users.senha !== '') {
      return new Promise(() => {
        const dados = {
          requisicao: 'editar',
          nome: this.users.nome,
          usuario: this.users.usuario,
          senha: this.users.senha,
          id: this.users.id
        };
        this.provider.api(dados, this.path)
          .subscribe((data: any) => {

            if (data['success']) {
              alert('Editado com sucesso!!');
              window.location.reload();
            } else {
              alert('Erro ao Editar!!');
            }

          });
      });

    } else {
      alert('Prencha os Campos!');
    }
  }


  excluir(uid: number) {
    return new Promise(resolve => {
      const dados = {
        requisicao: 'excluir',
        id: uid
      };
      this.provider.api(dados, this.path)
        .subscribe((data: any) => {

          if (data['success']) {
            window.location.reload();
          } else {
            alert('Erro ao Excluir!!');
          }

        });
    });
  }

}


