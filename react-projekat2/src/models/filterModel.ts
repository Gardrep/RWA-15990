export interface FilterModel {
    searchString: string;
    SearchHealthStart: number;
    SearchHealthEnd: number;
    SearchAttackStart: number;
    SearchAttackEnd: number;
    SearchDeffenceStart: number;
    SearchDeffenceEnd: number;
    searchTypes: string[];
}

export const searchBaseList: string[] = ["SearchHealthStart", "SearchHealthEnd", "SearchAttackStart", "SearchAttackEnd", "SearchDeffenceStart", "SearchDeffenceEnd"];
