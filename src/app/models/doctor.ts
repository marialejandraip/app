export interface Doctor {
    primerNombre: string,
    segundoNombre?: string
    primerApellido: string,
    segundoApellido?: string,
    tipoDocumento: string,
    numeroDocumento: string,
    rol: string,
    direccion: string,
    ciudad: string,
    departamento: string,
    pais: string,
    telefono?: string,
    correoElectronico?: string,
    estado: boolean
}
