export interface IHobby {
    id: string | number
    hobby: string
    passion: 'low' | 'medium' | 'high' | 'very-high' | '' | any
    year: string
 }
 
 export interface IUser {
   id: number
   user: string
   hobbies: IHobby[]
 }
 
 export interface IUserState {
   value: IUser[];
   status: 'idle' | 'loading' | 'failed';
 }
 