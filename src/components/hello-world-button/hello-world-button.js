import './hello-world-button.css';
// import './style.scss';

export class HelloWorldButton {
    textClass = 'text';
    render() {
        const button = document.createElement('button');
        button.innerHTML = 'Hello World';
        button.addEventListener('click', e => {
            const p = document.createElement('p');
            p.innerHTML = 'Hello World !!';
            p.classList.add(this.textClass);
            document.body.appendChild(p);
        });
        document.body.appendChild(button);
    }
}
