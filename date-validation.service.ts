import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateValidationService {

  constructor() { }

  // Method to validate Dates for Search Criteria:


  // Id Issue Date Validator :
  idDateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const idIssueDate = formGroup.get('idIssueDate')?.value;
      const idIssueExpireDate = formGroup.get('idIssueExpireDate')?.value;

      if (idIssueDate && idIssueExpireDate) {
        const issueDate = new Date(idIssueDate);
        const expireDate = new Date(idIssueExpireDate);
        return issueDate <= expireDate ? null : { idDateRangeInvalid: true };
      }

      return null;
    };
  }

  birthDateBeforeQualificationDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const birthDate = formGroup.get('birthDate')?.value;
      const qualificationDate = formGroup.get('qualificationDate')?.value;

      if (birthDate && qualificationDate) {
        const birthDateObj = new Date(birthDate);
        const qualificationDateObj = new Date(qualificationDate);
        // Check if birthDate is not before qualificationDate
        if (birthDateObj >= qualificationDateObj) {
          return { dateInvalid: true }; // Set error key
        }
      }
      return null;
    };
  }

  dateAfterBirthDateValidator(birthDateValue: string | any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent;
      if (!form) {
        return null; // Ensures form is initialized
      }
      const birthDate = birthDateValue?.value;
      const targetDate = control.value;
      if (birthDate && targetDate) {
        const birthDateObj = new Date(birthDate);
        const targetDateObj = new Date(targetDate);
        // Check that birthDate is before targetDate
        if (birthDateObj >= targetDateObj) {

          return { dateInvalid: true }; // Return error if birthDate is not before targetDate
        }
        // Calculate the difference in years
        const diffInTime = targetDateObj.getTime() - birthDateObj.getTime();
        const diffInYears = diffInTime / (1000 * 3600 * 24 * 365.25); // Convert time difference to years

        // Check if the difference is greater than 10 years
        if (diffInYears <= 10) {
          return { diffInYears: true }; // Return error if the difference is not greater than 10 years
        }
      }
      return null; // No error
    };
  }


  firstContractDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent;
      if (!form) {
        return null; // Ensures form is initialized
      }
      const jobDate = form.get('jobDate')?.value;
      const firstContractDate = control.value;

      if (jobDate && firstContractDate) {
        const jobDateObj = new Date(jobDate);
        const firstContractDateObj = new Date(firstContractDate);
        if (jobDateObj < firstContractDateObj) {
          return { moreThanJobDateError: true }; // Return error if birthDate is not before targetDate
        }

      }
      return null; // No error
    };
  }
  // Calculate the contract expiry date
  calculateContractExpiryDate(startDate: string, contractPeriod: number | any) {
    const start = new Date(startDate);
    const yearsToAdd = contractPeriod / 12;
    return new Date(start.setFullYear(start.getFullYear() + yearsToAdd)).toISOString().split('T')[0];
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  dateRangeValidator(
    startField: string,
    endField: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const startDate = formGroup.get(startField)?.value;
      const endDate = formGroup.get(endField)?.value;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start <= end ? null : { dateRangeInvalid: true };
      }

      return null;
    };
  }

  validateExperienceYears(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent;
      if (!form) {
        return null;
      }
      const experienceYears = control.value;
      if (experienceYears) {
        const isValid = /^[0-9]{1,2}$/.test(experienceYears);
        if (!isValid) {
          return { maxYears: true };
        }
      }
      return null; // No error
    };
  }

}
