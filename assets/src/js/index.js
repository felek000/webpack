import foo from './partials/foo'
import bar from './partials/bar'
import _ from 'lodash'

let a = {
  cos(){
    alert('aaaa')
  }
}

a.cos();

foo.sayFoo();
bar.sayBar();
console.log( _.chunk(['a', 'b', 'c', 'd'], 2) )

$('#test').on('click',(e)=>{
  console.log(e);
  
  function isBigEnough(value) {
    return value >= 10;
  }
  
  let filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
  console.log(filtered);
});