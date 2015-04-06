/*
 * Developer: Andrey Zubkov
 * Date: 2015-04-05
 */
$(function(){


    function process(data){
        var res = [];
        var lines = data.split('\n');
        for (var i = 2; i < lines.length; i++){
            var line = lines[i].split(',');
            var n = parseInt(line[1]);
            res[n] = {
                cn: n,
                con: line[3],
                status: line[4]
            }
        }
        return res;
    }

    $.ajax({
        url: "data/Global-1-4-2015.xlsx - EU-1-4-2015.csv",
        success: function(data){
            var body = $("body");
            var s = process(data);
            for (var i = 1; i <= 35000; i++){
                var a = s[i],
                    cls = 'missing',
                    info = '2015EU' + i + "\n";
                if (a){

                    switch(a.con){
                        case 'At NVC':
                            cls = 'nvc';
                            info += a.con;
                            break;

                        case 'In Transit':
                            cls = 'transit';
                            info += a.con;
                            break;

                        case 'Transfer in Progress':
                            cls = 'transfer';
                            info += a.con;
                            break;

                        default:
                            cls = 'con '  + a.con.toLowerCase();
                            info += cons[a.con] + "\n" + a.status;
                            switch (a.status){
                                case 'Issued':
                                    cls += " issued";
                                    break;
                                case 'Administrative Processing':
                                    cls += " ap";
                                    break;
                                case 'Ready':
                                    cls += " ready";
                                    break;
                                case 'Refused':
                                    cls += " refused";
                                    break;
                                default:
                                    cls += " strange";
                                    break;
                            }
                            break;
                    }
                }

                body.append("<div title='"+ info +"' class='"+ cls +"'></div>");
            }
        },
        error: function(){
            alert('Failed to load data!');
        }
    })

});
