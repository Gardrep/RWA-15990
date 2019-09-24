export interface UserModel {
    id: number;
    username: string;
    password: string;
    team: Team[];
}

export interface Team {
    id: number;
}
