/* citation/reference mechanism -jWilliamDunn */
"use strict";
(function (w) {
  let refNum = 0;
  w.citeRef = {
    create: function(n){
      if(n!==undefined) {
        refNum = n;
        document.documentElement.style.setProperty('--counter-value', refNum);
      }
      document.querySelectorAll('cite').forEach(function(citation) {
        refNum++;
        let r = document.createElement('li');
        r.innerHTML = citation.innerHTML + ' <a href="#ref-' + refNum + '">^</a>';
        document.querySelector('.refs').appendChild(r);
        citation.setAttribute('data-reference', 'ref-' + refNum);
        citation.setAttribute('data-num', refNum);
        citation.setAttribute('id', 'ref-' + refNum);
      });
    }
  };
})(window);