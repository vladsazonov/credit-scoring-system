import { ICoefficient } from './coefficient.interface';

export interface IClient {
  id: string;
  name: string;
  info: {
    // Revenues/expenses and property
    salary: number;
    spouseSalary: number;
    otherRevenues: number;
    totalPropertyCost: number;
    totalCarCost: number;
    mandatoryPayments: number;

    // Employment
    totalWorkExperience: number;
    numberOfPositions: number;
    occupation: ICoefficient;
    position: string;
    jobType: ICoefficient;
    workExperience: ICoefficient;

    // Personal information
    name: string;
    dateOfBirth: string;
    sex: string;
    familyStatus: ICoefficient;
    childrenCount: number;
    citizenship: string;
    city: string;
    education: ICoefficient;
    lengthOfStay: number;

    // Credit info
    loanRepayments: number;
    activeLoans: number;
  };
}
