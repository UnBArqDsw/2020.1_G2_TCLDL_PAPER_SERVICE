import datefnstz from 'date-fns-tz';
import { DateGeneratorAdapter } from './DateGeneratorAdapter';

describe('Date generator adapter', () => {
  let sut = new DateGeneratorAdapter();

  describe('when calls generate', () => {
    describe('and promise resolves', () => {
      let result: string;
      let mockedDate: Date;
      const dateFormat = 'yyyy-M-dd HH:mm:ss z';
      beforeAll(() => {
        mockedDate = new Date();
        jest.spyOn(datefnstz, 'utcToZonedTime').mockReturnValueOnce(mockedDate);
        jest.spyOn(datefnstz, 'format').mockReturnValueOnce('valid_date');
        result = sut.generate();
      });

      it('should return a valid date', () => {
        expect(result).toBe('valid_date');
      });

      it('format should have been called with correct parameters', () => {
        expect(datefnstz.format).toHaveBeenCalledWith(mockedDate, dateFormat, {
          timeZone: 'America/New_York',
        });
      });
      describe('and process.env.TZ is defined', () => {
        beforeAll(() => {
          process.env.TZ = 'America/Los_Angeles';
          mockedDate = new Date();
          jest.spyOn(datefnstz, 'utcToZonedTime').mockReturnValueOnce(mockedDate);
          jest.spyOn(datefnstz, 'format').mockReturnValueOnce('valid_date');
          sut.generate();
        });

        afterAll(() => {
          delete process.env.TZ;
        });

        it('format should have been called with correct parameters', () => {
          expect(datefnstz.format).toHaveBeenCalledWith(mockedDate, dateFormat, {
            timeZone: 'America/New_York',
          });
        });
      });

      describe('and process.env.TZ is not defined', () => {
        beforeAll(() => {
          delete process.env.TZ;
          sut = new DateGeneratorAdapter();
          mockedDate = new Date();
          jest.spyOn(datefnstz, 'utcToZonedTime').mockReturnValueOnce(mockedDate);
          jest.spyOn(datefnstz, 'format').mockReturnValueOnce('valid_date');
          sut.generate();
        });

        it('format should have been called with correct parameters', () => {
          expect(datefnstz.format).toHaveBeenCalledWith(mockedDate, dateFormat, {
            timeZone: 'America/New_York',
          });
        });
      });
    });
  });
});
