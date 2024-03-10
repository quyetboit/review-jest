module.exports = {
  preset: 'jest-preset-angular', //Cau hinh preset cho jest
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'], // Mang cac tep js, dc chay truoc khi chay test, dung de cau hinh cac thu vien bo tro
  globalSetup: 'jest-preset-angular/global-setup',
	moduleNameMapper: {
	    '^src/(.*)$': '<rootDir>/src/$1',
	}, // Cau hinh anh xa den cac file module khi chay test
};