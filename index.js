const express = require('express');
const app  = express();
const port  = 8000;




app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views')



app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error in running the server : ${err}`);
        return;
    }
    console.log(`server is running at port number : ${port}`);


});