if (process.env.NODE_ENV === "production") {
    var {MONGOURI} = await import('./prod.js');
    var {JWT_SECRET} = await import('./prod.js');
}
else{
    var {MONGOURI} = await import('./dev.js');
    var {JWT_SECRET} = await import('./dev.js');
}

export {MONGOURI,JWT_SECRET}
