import { FormArray, FormControl, FormGroup } from '@angular/forms';

export function markAllFieldsAsTouched(form: FormGroup | FormArray) {
  if (!form.controls) {
    return;
  }

  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.markAllFieldsAsTouched(control);
    } else if (control instanceof FormArray) {
      control.controls.forEach((c: FormGroup) => this.markAllFieldsAsTouched(c));
    }
  });
}

export function isFormInvalid(form: FormGroup): boolean {
  const { controls } = form;
  return !!Object.keys(controls).find((key: string) => controls[key].status === 'INVALID');
}
