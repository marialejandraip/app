import { Dictamen } from "./dictamen";
import { Doctor } from "./doctor";
import { Paciente } from "./paciente";

export interface HistoriaClinica {

    dictamen: Dictamen,
    doctor: Doctor,
    paciente: Paciente
}