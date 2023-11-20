import { Candidate } from "./candidate.interface";

export interface Ballot {
    charge_id: number;
    exercise_id: string;
    candidates: Candidate[];
}

