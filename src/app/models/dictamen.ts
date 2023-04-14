export interface Dictamen {
    consecutivo: number,
    fechaRecepcion: Date,
    fechaValoracion?: Date,
    motivo: string,
    estado: boolean
}