const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MesInicialSchema = new Schema({
    numero: Number,
    nombre: String,
    dias: [Number]
})

const MesFinalSchema = new Schema({
    numero: Number,
    nombre: String,
    dias: [Number]
})

const FechaSchema = new Schema({
    diaInicial: Number,
    diaFinal: Number,
    mesInicial: MesInicialSchema,
    mesFinal: MesFinalSchema,
    anoInicial: Number,
    anoFinal: Number,
    duracionDias: Number,
    rank: Number
})

const EventSchema = new Schema({
    nombreEvento: String,
    fecha: FechaSchema,
    linkEvento: String
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;


/*{
        nombreEvento: "Intro 24", 
        fecha:{
            diaInicial: 28,
            diaFinal: 2,
            mesInicial: {
                numero: 7,
                dias: [28, 29, 30]
            },
            mesFinal: {
                numero: 8,
                dias: [0, 1, 2]
            },
            anoInicial: 2023,
            anoFinal: 2023,
            duracionDias: 7,
        }, 
        }*/