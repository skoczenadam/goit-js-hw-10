import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as u}from"./assets/vendor-2b44ac2e.js";const o=new Date;let e=0;function i(t){const n=Math.floor(t/864e5),r=Math.floor(t%864e5/36e5),c=Math.floor(t%864e5%36e5/6e4),s=Math.floor(t%864e5%36e5%6e4/1e3);return{days:n,hours:r,minutes:c,seconds:s}}const a={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){o.getTime()>=t[0].getTime()?window.alert("Please choose a date in the future"):e=t[0].getTime()-o.getTime()}},l=document.querySelector('input[type="text"]');u(l,a);const d=document.querySelector('button[type="button"]'),m=()=>{console.log(e),console.log(i(e)),e--},h=()=>{setInterval(m,1e3)};d.addEventListener("click",h);
//# sourceMappingURL=commonHelpers.js.map
