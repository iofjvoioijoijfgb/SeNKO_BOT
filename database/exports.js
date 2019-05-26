module.exports.help_connect = function(){
    var no_connect = 
        '+-------------------------------+\n'+
        '|   ERR > No connect MongoDB    |\n'+
        '+------[ HELP TO CONNECT ]------+\n'+
        '|1: Win+R                       |\n'+
        '|2: Open "Выполнить" then "cmd" |\n'+
        '|3: then "mongod" Enter         |\n'+
        '+-------------------------------+\n'
    ;
    console.log('\n'.repeat(50) + no_connect)
}

module.exports.connect = function(){
    var con = 
        '+-------------------------------+\n'+
        '|OK > Successful connect MongoDB|\n'+
        '+-------------------------------+\n'+
        '|         IP:localhost          |\n'+
        '|          Port:27017           |\n'+
        '+-------------------------------+'
    ;
    console.log(con)
}