// classes que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
        
        this.tbody = this.root.querySelector('tbody')
    }

    load(){
        this.entries =  [
            {
                login: 'Guilherme',
                name: 'Guilherme Carvalho',
                public_repos: '50',
                followers:'100',
            },
            {
                login: 'Aline',
                name: 'Aline Lazaro',
                public_repos: '10',
                followers:'70',
            }
        ]
    }
}
// classes que vai criar a visualização no HTML
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.update()
    }

    update(){
    this.removeAllTr();

    this.entries.forEach(user => {
        const row = this.creatRow()

        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Imagem de ${user.name}`
        row.querySelector('.user p').textContent = user.name;
        row.querySelector('.user span').textContent = user.login;
        row.querySelector('.repositories').textContent = user.public_repos;
        row.querySelector('.followers').textContent = user.followers;
        
        this.tbody.append(row)
    })
    }

    creatRow(){
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/Guilhermecarvalho11.png" alt="Imagem de Guilherme">
                <a href="https://github.com/Guilhermecarvalho11">
                    <p>Guilherme</p>
                    <span>Carvalho</span>
                </a>
            </td>
            <td class="repositories"></td>
            <td class="followers"></td>
            <td>
                <button class="remove" onclick="update()"> &times;</button> 
            </td>
                `;

        return tr;
    }

    removeAllTr(){

        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove();
        })
    }
}