import { Header } from './components/header/header';
import { Panda } from './components/panda/panda';
import * as _ from 'lodash';

const panda = new Panda();
const header = new Header();
header.render();
panda.render();
console.log(_.upperFirst('image'));