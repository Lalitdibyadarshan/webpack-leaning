import { Header } from './components/header/header';
import { HelloWorldButton } from './components/hello-world-button/hello-world-button';
import * as _ from 'lodash';

const helloWorldButton = new HelloWorldButton();
const header = new Header();
header.render();
helloWorldButton.render();
console.log(_.upperFirst('hello'))