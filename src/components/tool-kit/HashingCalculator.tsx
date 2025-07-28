// src/components/tool-kit/HashingCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

// Browser SubtleCrypto supports SHA-* (not MD5). We'll polyfill MD5 tiny version.
async function sha256(message: string) {
  const enc = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Simple JS MD5 implementation (tiny)
function md5(str: string) {
  // (For brevity, a tiny MD5 implementation)
  // Source: https://stackoverflow.com/a/16515203 (minified-ish, adapted)
  function rhex(n:number){var s="",j;for(j=0;j<4;j++)s+=("0"+((n>>>(j*8))&255).toString(16)).slice(-2);return s}
  function ad(x:number,y:number){var l=(x&65535)+(y&65535),m=(x>>16)+(y>>16)+(l>>16);return(m<<16)|(l&65535)}
  function rl(n:number,c:number){return(n<<c)|(n>>>(32-c))}
  function cm(q:number,a:number,b:number,x:number,s:number,t:number){return ad(rl(ad(ad(a,q),ad(x,t)),s),b)}
  function ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cm((b&c)|((~b)&d),a,b,x,s,t)}
  function gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cm((b&d)|(c&(~d)),a,b,x,s,t)}
  function hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cm(b^c^d,a,b,x,s,t)}
  function ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cm(c^(b|(~d)),a,b,x,s,t)}
  function binl(x:number[],len:number){
    x[len>>5]|=128<<(len%32);x[(((len+64)>>>9)<<4)+14]=len;
    var i,olda,oldb,oldc,oldd,a=1732584193,b=-271733879,c=-1732584194,d=271733878;
    for(i=0;i<x.length;i+=16){
      olda=a;oldb=b;oldc=c;oldd=d;
      a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);
      c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330);
      a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);
      c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983);
      a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);
      c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
      a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);
      c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329);
      a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);
      c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302);
      a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);
      c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848);
      a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);
      c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501);
      a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);
      c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);
      a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);
      c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556);
      a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);
      c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640);
      a=ii(a,b,c,d,x[i],6,681279174);d=ii(d,a,b,c,x[i+7],10,-358537222);
      c=ii(c,d,a,b,x[i+14],15,-722521979);b=ii(b,c,d,a,x[i+5],21,76029189);
      a=ii(a,b,c,d,x[i+12],6,-640364487);d=ii(d,a,b,c,x[i+3],10,-421815835);
      c=ii(c,d,a,b,x[i+10],15,530742520);b=ii(b,c,d,a,x[i+1],21,-995338651);
      a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rhex(a)+rhex(b)+rhex(c)+rhex(d);
  }
  function str2binl(str:string){
    var bin:Array<number> = [], mask=(1<<8)-1;
    for(var i=0;i<str.length*8;i+=8) bin[i>>5]=(bin[i>>5]||0)|((str.charCodeAt(i/8)&mask)<<(i%32));
    return bin;
  }
  return binl(str2binl(str),str.length*8);
}

export default function HashingCalculator() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState<"MD5"|"SHA-256">("SHA-256");
  const [out, setOut] = useState("");

  const run = async () => {
    if (!input) return setOut("");
    if (algo === "MD5") setOut(md5(input));
    else setOut(await sha256(input));
  };

  return (
    <ToolShell title="Hashing Calculator">
      <textarea
        className="w-full h-32 bg-gray-800 text-white p-2 rounded mb-3"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text to hash"
      />
      <div className="flex gap-2 mb-3">
        <select  aria-label="hash" value={algo} onChange={e => setAlgo(e.target.value as any)} className="bg-gray-800 text-white rounded px-2 py-1">
          <option>SHA-256</option>
          <option>MD5</option>
        </select>
        <button onClick={run} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Hash</button>
      </div>
      {out && (
        <div className="text-xs break-all">
          <span className="text-gray-400">{algo}:</span> {out}
        </div>
      )}
    </ToolShell>
  );
}
