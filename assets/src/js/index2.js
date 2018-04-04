import foo from './partials/foo'
import bar from './partials/bar'
import _ from 'lodash';

let a = {
  cos(){
    alert('aaaa')
  }
}

a.cos();
console.log('index2');
foo.sayFoo();

console.log( _.chunk(['a', 'b', 'c', 'dddd'], 2) )