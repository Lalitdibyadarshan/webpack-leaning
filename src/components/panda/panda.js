import './panda.css';
import kaizen from '../../../assets/img/KAIZEN.png'

export class Panda {
    render() {
        const img = document.createElement('img');
        img.alt = 'kaizen';
        img.width = 300;
        img.src = kaizen;
        img.classList.add('panda');
        const body = document.querySelector('body');
        body.appendChild(img);
    }
}