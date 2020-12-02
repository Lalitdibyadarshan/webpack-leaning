import { Header } from './components/header/header';
import { HelloWorldButton } from './components/hello-world-button/hello-world-button';
import addImage from './image';


addImage();
const helloWorldButton = new HelloWorldButton();
const header = new Header();
header.render();
helloWorldButton.render();