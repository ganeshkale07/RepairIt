export default class SignUpForm {
  constructor(
    public email: string = '',
    public password: string = '',
    public isAdmin: boolean = false
  ) {}
}
