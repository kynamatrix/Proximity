"use strict";

// The following script enables dark/light mode toggling
function toggleDark(e){
  try {
    var d=document.documentElement, c=d.classList;
    if(e==='light') {c.remove('dark');gDark=false;} // note: integrated with dark/light
    else {c.remove('light');gDark=true;}
    d.style.colorScheme=e; c.add(e);
    localStorage.setItem('theme',e);
    
    
    const images = document.querySelectorAll('.darkswap');
    images.forEach(img => {
      if (d.style.colorScheme==='dark') {
        img.src = img.src.replace('light', 'dark');
      } else {
        img.src = img.src.replace('dark', 'light');
      }
    });
    
    
  } catch(e) {}
}
// This part saves the theme preference to local storage
!function() { // initialize theme preference
  try {
    var d=document.documentElement, c=d.classList;
    // check local storage first for override
    var e=localStorage.getItem('theme');
    if(e==='light')                   gDark=false; else gDark=true;
    if('system'===e || (!e && true)) {
      // check OS default
      var t='(prefers-color-scheme: dark)',
        m = window.matchMedia(t);
      if(m.media !== t || m.matches) {
        d.style.colorScheme='dark'; c.add('dark');
      } else {
        d.style.colorScheme='light'; c.add('light');
      }
    } else if(e) {
      c.add(e || '');
    }
    if(e==='light' || e==='dark') d.style.colorScheme = e;
    
    
    const images = document.querySelectorAll('.darkswap');
    images.forEach(img => {
      if (d.style.colorScheme==='dark') {
        img.src = img.src.replace('light', 'dark');
      } else {
        img.src = img.src.replace('dark', 'light');
      }
    });
    
    
  } catch(e) {}
}()