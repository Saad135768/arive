export enum Passion {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very-high',
}

export interface IHobby {
    _id?: any
    hobby: string
    passion: Passion | undefined | ''
    year: string
 }
 
 export interface IUser {
   _id?: any
   user: string
   hobbies: IHobby[]
 }
 
 export interface IUserState {
   value: IUser[];
   loading: boolean;
 }
 