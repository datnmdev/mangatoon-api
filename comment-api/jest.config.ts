import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: `${process.cwd()}/tests/reports`,
      outputName: 'junit.xml',
    }]
  ]
}

export default config;