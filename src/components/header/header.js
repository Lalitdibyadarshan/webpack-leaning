import './header.css';
export class Header {
    render() {
        let h1 = document.createElement('h1');
        h1.innerHTML = 'Webpack is Awesome !!';
        document.body.appendChild(h1);
    }
}