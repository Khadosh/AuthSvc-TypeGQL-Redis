import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../../../entity/User.entity";
 
@ValidatorConstraint({ async: true })
export class isEmailUsedConstraint implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    return !!(await User.findOne({where: {email}}))
  }
}
 
export function isEmailUsed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isEmailUsedConstraint
    });
  };
}