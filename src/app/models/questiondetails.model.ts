// export interface QuestionDetails{
//     quizId:number;
//     quizName:string;
//     description:string;
//     questionId:number;
//     questionText:string;
// }


export interface Option {
    answerId: number;
    answerText: string;
    isCorrect: boolean;
  }
  
  export interface QuestionDetails {
    quizId: number;
    quizName: string;
    description: string;
    questionId: number;
    questionText: string;
    options: Option[]; // Array of options for each question
  }

