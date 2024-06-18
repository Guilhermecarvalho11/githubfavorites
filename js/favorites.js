export class GithubUser {
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`;

        return fetch(endpoint)
        .then(data => data.json())
        .then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}

// classes que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root){
        this.root = document.querySelector(root);

        this.load();
        
        this.tbody = this.root.querySelector('tbody');

        GithubUser.search('Guilhermecarvalho11').then(user => user);
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
    }

    save(){
        localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
    }

  async add(username){
    try{
        const userExists = this.entries.find(entry => entry.login === username);
        
        if(userExists){
            throw new Error('Usuário já cadastrado')
        }

        const user = await GithubUser.search(username);

        if(user.login === undefined){
            throw new Error('Usuário não existe')
        }

        this.entries = [user, ...this.entries];
        this.update();
        this.save();

    }catch(error){
        alert(error.message)

    }

    }

    delete(user){
        const filteredEntries = this.entries
        .filter((entry) => entry.login !== user.login);

        this.entries = filteredEntries;
        this.update();
        this.save();
    }
}
// classes que vai criar a visualização no HTML
export class FavoritesView extends Favorites{
    constructor(root){
        super(root);
        this.update();
        this.onadd();
    }

    onadd() {
        const addButton = this.root.querySelector('.search button');
        addButton.onclick = () => {
            const input = this.root.querySelector('.search input').value;
            
            this.add(input);

        }
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

        row.querySelector('.remove').onclick = () => {
           const isOk = confirm('Tem certeza que deseja deletar?');

           if(isOk){
            this.delete(user)
           }
        }
        
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