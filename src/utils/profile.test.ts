import { getFullName, getShortName, getInitials, getName } from './profile';

describe('profile utils', () => {
  describe('getFullName', () => {
    it('should return full name', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'JD',
      };

      expect(getFullName(profile)).toBe('John "JD" Doe');
    });

    it('should return full name with empty nickname', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: 'Doe',
        nickname: '',
      };

      expect(getFullName(profile)).toBe('John Doe');
    });

    it('should return full name with empty nickname and empty last name', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: '',
        nickname: '',
      };

      expect(getFullName(profile)).toBe('John');
    });
  });

  describe('getShortName', () => {
    it('should return short name', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'JD',
      };

      expect(getShortName(profile)).toBe('John D.');
    });

    it('should return short name with empty lastname', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: '',
        nickname: '',
      };

      expect(getShortName(profile)).toBe('John');
    });
  });

  describe('getInitials', () => {
    it('should return initials', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'JD',
      };

      expect(getInitials(profile)).toBe('JD');
    });

    it('should return initials with empty lastname', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: '',
        nickname: '',
      };

      expect(getInitials(profile)).toBe('J');
    });
  });

  describe('getName', () => {
    it('should return first and last name', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'JD',
      };

      expect(getName(profile)).toBe('John Doe');
    });

    it('should return full name with empty lastname', () => {
      expect.assertions(1);

      const profile = {
        firstName: 'John',
        lastName: '',
        nickname: '',
      };

      expect(getName(profile)).toBe('John');
    });
  });
});
