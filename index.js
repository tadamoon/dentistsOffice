const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const { v4: uuid } = require('uuid');
uuid();


app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


let patients=[
    {name: "Sarah Silver", age: 25, phone: 2222222222, appt: "", id: uuid() },
    {name: "Stephanie Boors", age: 12, phone: 1111111111,  appt: "", id: uuid()}, 
    {name: "Mark Bobbler", age: 33, phone: 4444444444,  appt: "",  id: uuid()},
    {name: "Innit Pasio", age: 15, phone: 3333333333, appt: "", id: uuid()},
    {name: "John Johnson", age: 45, phone: 5555555555, appt: "", id: uuid()},
    {name: "Bob Aronson", age: 70, phone: 7777777777, appt: "", id: uuid()}
]

//patients page
app.get('/', (req, res) =>{

    res.render('existingpatientlookup', {patients})
})

//home page
app.get('/home', (req, res) =>{
    res.render('home');
})

//new patients form
app.get('/newpatient', (req, res) =>{
    res.render('newpatient');
})

//push the info into the array
app.post('/existingpatientlookup', (req, res) =>{
    const {name, age, phone, appt}= req.body;
    patients.push({name, age, phone, appt, id: uuid() });
    console.log(req.body);
    res.redirect('/');
})

//show page
app.get('/existingpatientlookup/:id', (req, res) =>{
    
    const {id}=req.params;
    const patient = patients.find(a => a.id===(id));
    
  res.render('appointment', { patient })
    
       
})
//edit form for updating comments
app.get('/existingpatientlookup/:id/edit', (req, res)=>{
    const {id} =req.params;
   
    const appt = patients.find(a => a.id===(id));
    res.render('new', { appt })
})
//update the comments and display
app.patch('/existingpatientlookup/:id', (req, res) =>{
    const {id} =req.params;
    const newApptText=req.body.appt;
    const foundAppt = patients.find(a => a.id===(id));
    foundAppt.appt=newApptText;
    console.log(foundAppt.appt)
    res.redirect('/');
})


//delete comments
app.delete('/existingpatientlookup/:id', (req, res) =>{
    const {id} =req.params;
    //const foundComment = comments.find(c => c.id===(id)); 
    patients = patients.filter(a => a.id !==(id));
    res.redirect('/');
})

//services provided
app.get('/services', (req, res) =>{
    res.render('services');
});

//billing
app.get('/billing', (req, res) =>{
    res.render('billing');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, () =>{
    console.log('Listening on port 3000!');
});