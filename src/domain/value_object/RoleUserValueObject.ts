export class UserRole {
  role: string;

  public roleAdmin() {
    this.role = 'Admin';
    return this.role;
  }

  public roleSubAdmin() {
    this.role = 'SubAdmin';
    return this.role;
  }

  public roleCollab() {
    this.role = 'Collab';
    return this.role;
  }
}
