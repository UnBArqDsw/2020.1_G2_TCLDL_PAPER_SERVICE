import { Authenticate } from "@domain/entities/Authenticate";

export interface Login {
    execute: (data: Authenticate) => Promise<string>  
}