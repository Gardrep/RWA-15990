export interface PokemonModel {
    id:   number;
    name: Name;
    type: string[];
    base: Base;
}

export interface Base {
    HP:        number;
    Attack:    number;
    Defense:   number;
    SpAttack:  number;
    SpDefense: number;
    Speed:     number;
}

export interface Name {
    english:  string;
    japanese: string;
    chinese:  string;
}

export const classList:string[] = ["Normal", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel"];

