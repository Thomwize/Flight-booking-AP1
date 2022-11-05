exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}

const {Flights} = require("../models/Flight");
const {v4: uuid} = require('uuid');

//getting all users
exports.getFlights = async(req, res)=>{
    try{
        const flights = Flights;
        res.status(200).json({
            message: "All flights",
            flights: flights
        });
            
    } catch(err){
        res.status(500).json({message: err});
    }
};

//getting a single user

exports.getFlight = async(req, res)=>{
    try{
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id);
        res.status(200).json({
            message: "Flight found",
            flight,
        });
    }catch(error){

    }
}

//creating new user(post)
exports.createFlight = async(req, res)=>{
    try{
        const {title, time, price, date} = await req.body;

        const newFlight ={
            id: uuid(),
            title,
            time: new Date().toLocaleTimeString(),
            price,
            date: new Date().toLocaleDateString(), 
        };
        
        Flights.push(newFlight);
        res.status(201).json({
            message: "Flight created",
            newFlight,
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


//updating a Flight
exports.updateFlight = async(req, res)=>{
    try{
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id);
        const {title, time, price, date} = await req.body;
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;

        res.status(200).json({
            message: "Flight updated",
            flight,
        });
    }catch(error){
        res.status(500).json({
            message: err.message
        });
    }
}


//deleting a user

exports.deleteFlight = async(req, res)=>{
    try{
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id);
        Flights.splice(Flights.indexOf(flight), 1);
        res.status(200).json({
            message: "Flight deleted",
            flight,
        });
    }catch(error){
        res.status(500).json({
            message: err.message
        });
    }
}